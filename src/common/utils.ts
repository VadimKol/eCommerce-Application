import type { CatalogAction, CatalogState } from './types';

export const calculateAge = (birthDate: string): boolean => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age >= 13;
};

export const sortingTypes = ['Alphabetically, A-Z', 'Alphabetically, Z-A', 'Price, low to high', 'Price, high to low'];

export const fandoms = [
  'Genshin',
  'Disney',
  'Cyberpunk',
  'Batman',
  'Doctor Who',
  'Star Wars',
  'Beetlejuice',
  'Marvel',
  'One Piece',
  'Harry Potter',
  'Stranger Things',
  'Rick and Morty',
  'Supernatural',
];

export const QUERY_LIMIT = 12;
export const PRICE_FILTER_MIN = 1;
export const PRICE_FILTER_MAX = 100;

export function getFandomsFilter(franchises: boolean[]): string {
  const filter: string[] = [];

  franchises.forEach((franchise, index) => {
    fandoms.forEach((fandom, i) => {
      if (index === i && franchise) {
        filter.push(`"${fandom}"`);
      }
    });
  });

  return filter.length > 0 ? `variants.attributes.Fandom:${filter.join(',')}` : '';
}

export class StatusError extends Error {
  public statusCode: number;

  constructor(message: string, status: number) {
    super(message);
    this.statusCode = status;
  }
}

export const initialState: CatalogState = {
  products: [],
  page: 0,
  sortType: 'Sort',
  search: '',
  priceFilter: [PRICE_FILTER_MIN, PRICE_FILTER_MAX],
  franchises: Array(fandoms.length).fill(false),
  loadingProducts: true,
  categories: {},
};

export function reducerCatalog(
  state: CatalogState,
  {
    type,
    products = [],
    page = 0,
    sortType = 'Sort',
    search = '',
    priceFilter = [PRICE_FILTER_MIN, PRICE_FILTER_MAX],
    franchises = Array(fandoms.length).fill(false),
    loadingProducts = true,
    categories = {},
  }: CatalogAction,
): CatalogState {
  switch (type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories,
        page,
        sortType,
        priceFilter,
        franchises,
        search,
        loadingProducts,
      };
    case 'SET_PRODUCTS':
      return { ...state, products };
    case 'SET_LOADING_PRODUCTS':
      return { ...state, loadingProducts };
    case 'SET_SEARCH':
      return { ...state, search, page, loadingProducts };
    case 'SET_SORT_TYPE':
      return { ...state, sortType, loadingProducts };
    case 'SET_PRICE':
      return { ...state, priceFilter, page, loadingProducts };
    case 'SET_FRANCHISES':
      return { ...state, franchises, page, loadingProducts };
    case 'RESET_FILTERS':
      return { ...state, priceFilter, franchises, page, loadingProducts };
    case 'SET_PAGE':
      return { ...state, page, loadingProducts };
    default:
      return state;
  }
}
