import type { ClientResponse, CustomerSignin, CustomerSignInResult } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';

import { CustomTokenCache } from '@/common/token-cache';
import type { CategoriesData, GeekShopCustomerDraft, Product } from '@/common/types';
import { getFandomsFilter, QUERY_LIMIT } from '@/common/utils';

import {
  apiRoot,
  getAnonymousFlowApiRoot,
  getClientCridentialsFlowApiRoot,
  getPasswordFlowApiRoot,
  tokenCache,
} from './build-client';

export function login(customerSignin: CustomerSignin): Promise<ClientResponse<CustomerSignInResult>> {
  Object.assign(apiRoot, getPasswordFlowApiRoot(customerSignin.email, customerSignin.password));
  return apiRoot.login().post({ body: customerSignin }).execute();
}

export function logout(): Promise<void> {
  const revokeToken = async (): Promise<void> => {
    const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/oauth/token/revoke`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `token=${encodeURIComponent(tokenCache.get().token)}`,
    });

    if (response.ok) {
      localStorage.removeItem('geek-shop-token');
      Object.assign(tokenCache, new CustomTokenCache());
      Object.assign(apiRoot, getAnonymousFlowApiRoot());
    } else {
      throw new Error(`Failed to revoke token ${response.status} ${await response.text()}`);
    }
  };

  return revokeToken();
}

export function signup(myCustomerDraft: GeekShopCustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
  Object.assign(apiRoot, getClientCridentialsFlowApiRoot());
  return apiRoot.me().signup().post({ body: myCustomerDraft }).execute();
  // return apiRoot.customers().post({ body: myCustomerDraft }).execute(); // с анонима можно
}

export async function getCategories(): Promise<CategoriesData> {
  const categories: CategoriesData = [];
  try {
    const data = await apiRoot
      .categories()
      .get({ queryArgs: { limit: 50 } })
      .execute();
    data.body.results.forEach((category) => {
      if (!category.parent) {
        categories.push({
          id: category.id,
          name: category.name['en-US'] as string,
          slug: category.slug['en-US'] as string,
          key: category.key as string,
          subcategories: [],
        });
      }
    });
    data.body.results.forEach((subcategory) => {
      if (subcategory.parent) {
        const parentId = subcategory.parent.id;
        const category = categories.find((c) => c.id === parentId);
        if (category) {
          category.subcategories.push({
            id: subcategory.id,
            name: subcategory.name['en-US'] as string,
            slug: subcategory.slug['en-US'] as string,
            key: subcategory.key as string,
            products: [],
          });
        }
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      toast(error.message, { type: 'error' });
    } else {
      throw error;
    }
  }

  return [...categories];
}

export async function getProducts(
  offset: number,
  sortType: string,
  priceFilter: [number, number],
  franchises: boolean[],
  search: string,
  categoryID?: string,
  subcategoryID?: string,
): Promise<{ products: Product[]; total: number }> {
  const products: Product[] = [];
  let total = 0;
  let categoryRequest: string | undefined;

  if (categoryID) {
    categoryRequest = categoryID;
  }
  if (subcategoryID) {
    categoryRequest = subcategoryID;
  }
  let sort: string | undefined;
  switch (sortType) {
    case 'Alphabetically, A-Z': {
      sort = 'name.en-US asc';
      break;
    }
    case 'Alphabetically, Z-A': {
      sort = 'name.en-US desc';
      break;
    }
    case 'Price, low to high': {
      sort = 'price asc';
      break;
    }
    case 'Price, high to low': {
      sort = 'price desc';
      break;
    }
    default:
      sort = undefined;
      break;
  }
  const queryArgs = {
    limit: QUERY_LIMIT,
    offset: offset * 12,
    sort,
    filter: [`variants.price.centAmount:range (${priceFilter[0] * 100} to ${priceFilter[1] * 100})`],
  };
  if (categoryRequest) {
    queryArgs.filter.push(`categories.id:"${categoryRequest}"`);
  }
  const fandomsFilter = getFandomsFilter(franchises);
  if (fandomsFilter) {
    queryArgs.filter.push(fandomsFilter);
  }
  if (search) {
    Object.assign(queryArgs, { fuzzy: true, fuzzyLevel: 0, 'text.en-US': search });
  }

  try {
    const data = await apiRoot.productProjections().search().get({ queryArgs }).execute();

    total = data.body.total ?? 0;

    data.body.results.forEach((product) => {
      const description = product.description ? (product.description['en-US'] as string) : '';
      const { prices } = product.masterVariant;
      const price = prices && prices[0] ? (prices[0].value.centAmount / 100).toFixed(2) : '0.00';
      const discount =
        prices && prices[0] && prices[0].discounted ? (prices[0].discounted.value.centAmount / 100).toFixed(2) : '';
      const images = product.masterVariant.images ? product.masterVariant.images.map((image) => image.url) : [];
      const quantity = product.masterVariant.availability?.availableQuantity
        ? product.masterVariant.availability.availableQuantity
        : 0;
      products.push({
        id: product.id,
        name: product.name['en-US'] as string,
        description,
        slug: product.slug['en-US'] as string,
        key: product.key as string,
        sku: product.masterVariant.sku as string,
        quantity,
        price,
        discount,
        images,
        categoryId: product.categories[product.categories.length - 1]?.id as string,
        slugCategory: '',
        keyCategory: '',
        subcategoryId: product.categories[0]?.id as string,
        slugSubCategory: '',
        keySubCategory: '',
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      toast(error.message, { type: 'error' });
    } else {
      throw error;
    }
  }

  return { products: [...products], total };
}
