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
import type { CategoriesData, GeekShopCustomerDraft, ProductDetails } from '@/common/types';

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
