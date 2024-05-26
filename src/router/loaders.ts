import type { CategoriesData, Category, Product, Subcategory, UrlParams } from '@/common/types';

import categoriesData from './mock-products.json';

function assertNotNullOrUndefined<T>(value: T, message: string): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Response(message, { status: 404, statusText: 'Not Found' });
  }
}

export function loadCategories(): CategoriesData {
  return categoriesData as CategoriesData;
}

export function loadCategory({ params }: { params: UrlParams }): { category: Category } {
  const category = (categoriesData as CategoriesData).find((cat) => cat.id === params.categoryName);
  assertNotNullOrUndefined(category, 'Category not found');

  return { category };
}

export function loadSubcategory({ params }: { params: UrlParams }): { category: Category; subcategory: Subcategory } {
  const category = (categoriesData as CategoriesData).find((cat) => cat.id === params.categoryName);
  assertNotNullOrUndefined(category, 'Category not found');

  const subcategory = category.subcategories.find((sub) => sub.id === params.subcategoryName);
  assertNotNullOrUndefined(subcategory, 'Subcategory not found');

  return { category, subcategory };
}

export function loadProduct({ params }: { params: UrlParams }): {
  category: Category;
  subcategory: Subcategory;
  product: Product;
} {
  const category = (categoriesData as CategoriesData).find((cat) => cat.id === params.categoryName);
  assertNotNullOrUndefined(category, 'Category not found');

  const subcategory = category.subcategories.find((sub) => sub.id === params.subcategoryName);
  assertNotNullOrUndefined(subcategory, 'Subcategory not found');

  const product = subcategory.products.find((prod) => prod.id === params.productName);
  assertNotNullOrUndefined(product, 'Product not found');

  return { category, subcategory, product };
}
