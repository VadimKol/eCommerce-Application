import { toast } from 'react-toastify';

import { CurrencySymbols } from '@/common/enums';
import type { CategoriesData, Product, ProductDetails } from '@/common/types';
import { DEFAULT_LOCALE, getCheckboxFilter, getSort, QUERY_LIMIT } from '@/common/utils';

import { apiRoot } from './build-client';

export async function getCategories(): Promise<CategoriesData> {
  const categories: CategoriesData = [];
  try {
    const data = await apiRoot.categories().get().execute();

    data.body.results.forEach((category) => {
      if (!category.parent) {
        categories.push({
          id: category.id,
          name: category.name[DEFAULT_LOCALE] ?? '',
          slug: category.slug[DEFAULT_LOCALE] ?? '',
          key: category.key ?? '',
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
            name: subcategory.name[DEFAULT_LOCALE] ?? '',
            slug: subcategory.slug[DEFAULT_LOCALE] ?? '',
            key: subcategory.key ?? '',
            products: [],
          });
        }
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      toast(error.message, { type: 'error' });
    }
  }

  return [...categories];
}

export async function getProducts(
  offset: number,
  sortType: string,
  priceFilter: [number, number],
  franchises: boolean[],
  countriesF: boolean[],
  materialsF: boolean[],
  search: string,
  categoryID?: string,
  subcategoryID?: string,
): Promise<{ products: Product[]; total: number }> {
  const products: Product[] = [];
  let total = 0;
  const categoryRequest = subcategoryID ?? categoryID;
  const queryArgs = {
    limit: QUERY_LIMIT,
    offset: offset * 12,
    sort: getSort(sortType),
    filter: [`variants.price.centAmount:range (${priceFilter[0] * 100} to ${priceFilter[1] * 100})`],
  };
  if (categoryRequest) {
    queryArgs.filter.push(`categories.id:"${categoryRequest}"`);
  }
  const fandomsFilter = getCheckboxFilter(franchises, 'Fandom');
  if (fandomsFilter) {
    queryArgs.filter.push(fandomsFilter);
  }
  const countriesFilter = getCheckboxFilter(countriesF, 'Country');
  if (countriesFilter) {
    queryArgs.filter.push(countriesFilter);
  }
  const materialsFilter = getCheckboxFilter(materialsF, 'Material');
  if (materialsFilter) {
    queryArgs.filter.push(materialsFilter);
  }
  if (search) {
    Object.assign(queryArgs, { fuzzy: true, fuzzyLevel: 0, [`text.${DEFAULT_LOCALE}`]: search });
  }

  try {
    const data = await apiRoot.productProjections().search().get({ queryArgs }).execute();

    total = data.body.total ?? 0;

    data.body.results.forEach((product) => {
      const description = product.description ? product.description[DEFAULT_LOCALE] ?? '' : '';
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
        name: product.name[DEFAULT_LOCALE] ?? '',
        description,
        slug: product.slug[DEFAULT_LOCALE] ?? '',
        key: product.key ?? '',
        sku: product.masterVariant.sku ?? '',
        quantity,
        price,
        discount,
        images,
        categories: product.categories.map(({ id }) => id),
        keyCategory: '',
        keySubCategory: '',
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      toast(error.message, { type: 'error' });
    }
  }

  return { products: [...products], total };
}

export async function getProduct(productKey: string): Promise<ProductDetails> {
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
    return Promise.reject(new Error('Product not found'));
  }

  const productTypeId = product.productType.id;

  const productTypeResponse = await apiRoot.productTypes().withId({ ID: productTypeId }).get().execute();

  const productType = productTypeResponse.body;

  const { id } = product;
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
    id,
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
}
