import type {
  ClientResponse,
  Customer,
  CustomerSignin,
  CustomerSignInResult,
  MyCustomerChangePassword,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';

import { CurrencySymbols } from '@/common/enums';
import { CustomTokenCache } from '@/common/token-cache';
import type { CategoriesData, GeekShopCustomerDraft, Product, ProductDetails } from '@/common/types';
import { getFandomsFilter, QUERY_LIMIT } from '@/common/utils';

import {
  apiRoot,
  getAnonymousFlowApiRoot,
  getClientCridentialsFlowApiRoot,
  getPasswordFlowApiRoot,
  tokenCache,
} from './build-client';

const DEFAULT_LOCALE = 'en-US';

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

export function profile(): Promise<ClientResponse<Customer>> {
  return apiRoot.me().get().execute();
}

export function changePassword(myCustomerChangePassword: MyCustomerChangePassword): Promise<ClientResponse<Customer>> {
  return apiRoot.me().password().post({ body: myCustomerChangePassword }).execute();
}

export function crudAddress(MyCustomerUpdate: MyCustomerUpdate): Promise<ClientResponse<Customer>> {
  return apiRoot.me().post({ body: MyCustomerUpdate }).execute();
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
          name: category.name[DEFAULT_LOCALE] as string,
          slug: category.slug[DEFAULT_LOCALE] as string,
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
            name: subcategory.name[DEFAULT_LOCALE] as string,
            slug: subcategory.slug[DEFAULT_LOCALE] as string,
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

export async function getProduct(productKey: string): Promise<ProductDetails> {
  try {
    const response = await apiRoot
      .productProjections()
      .get({
        queryArgs: {
          where: `key="${productKey}"`,
        },
      })
      .execute();

    const product = response.body.results[0];

    if (!product) {
      throw new Error('Product not found');
    }

    const productTypeId = product.productType.id;

    const productTypeResponse = await apiRoot.productTypes().withId({ ID: productTypeId }).get().execute();

    const productType = productTypeResponse.body;

    const name = product.name[DEFAULT_LOCALE];
    const description = product.description?.[DEFAULT_LOCALE];
    const { masterVariant } = product;
    const prices = masterVariant?.prices ?? [];
    const images = masterVariant?.images ?? [];
    const attributes = masterVariant?.attributes ?? [];
    const availability = masterVariant?.availability;

    const price = prices[0];
    const priceAmount = price?.value?.centAmount ? (price.value.centAmount / 100).toFixed(2) : null;
    const discountedAmount = price?.discounted ? (price.discounted.value.centAmount / 100).toFixed(2) : null;

    const currencySymbol = price?.value?.currencyCode
      ? CurrencySymbols[price.value.currencyCode as keyof typeof CurrencySymbols]
      : null;

    const attributeLabels = productType.attributes?.reduce(
      (acc, attr) => {
        acc[attr.name] = attr.label[DEFAULT_LOCALE]!;
        return acc;
      },
      {} as Record<string, string>,
    );

    return {
      name,
      description,
      price: priceAmount || null,
      discountedPrice: discountedAmount || null,
      currency: currencySymbol,
      images: images.map((image) => image.url),
      attributes: attributes.map((attr) => ({
        name: attributeLabels?.[attr.name] || attr.name,
        value: attr.value,
      })),
      availability: {
        isOnStock: availability?.isOnStock ?? null,
        availableQuantity: availability?.availableQuantity ?? null,
      },
    };
  } catch (error) {
    throw new Error(`Error fetching product information: ${error}`);
  }
}
