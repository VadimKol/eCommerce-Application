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

export const countriesFilter = ['China', 'France', 'Germany', 'India', 'Italy', 'Korea', 'US'];
export const materials = ['Aluminum', 'Cardboard', 'Ceramic', 'Coir', 'Paper', 'Plastic', 'Polyester'];
export const countries = [
  {
    title: 'United States',
    code: 'US',
    errorMsg: 'It must be 5 digits or 5+4 digits',
    postcode: /^\d{5}(-\d{4})?$/,
  },
  {
    title: 'Belarus',
    code: 'BY',
    errorMsg: 'It must be exactly 6 digits.',
    postcode: /^\d{6}$/,
  },
  {
    title: 'Russia',
    code: 'RU',
    errorMsg: 'It must be exactly 6 digits.',
    postcode: /^\d{6}$/,
  },
];

export const DEFAULT_LOCALE = 'en-US';
export const QUERY_LIMIT = 12;
export const PRICE_FILTER_MIN = 1;
export const PRICE_FILTER_MAX = 100;
export const REFRESH_TOKEN_EXPIRATION_DAYS = 150;
export const Discounts = [
  {
    name: 'GEEK-SHOP',
    desc: '-10% cart',
  },
  {
    name: 'COSPLAY',
    desc: '-10% category',
  },
];

export function getCheckboxFilter(checkboxes: boolean[], attribute: string): string {
  const filter: string[] = [];
  let constantsFilter: string[] = [];

  switch (attribute) {
    case 'Fandom': {
      constantsFilter = fandoms;
      break;
    }
    case 'Country': {
      constantsFilter = countriesFilter;
      break;
    }
    case 'Material': {
      constantsFilter = materials;
      break;
    }
    default:
      break;
  }

  checkboxes.forEach((checkbox, index) => {
    constantsFilter.forEach((element, i) => {
      if (index === i && checkbox) {
        filter.push(`"${element}"`);
      }
    });
  });

  return filter.length > 0 ? `variants.attributes.${attribute}:${filter.join(',')}` : '';
}

export function getSort(sortType: string): string | undefined {
  switch (sortType) {
    case 'Alphabetically, A-Z':
      return `name.${DEFAULT_LOCALE} asc`;
    case 'Alphabetically, Z-A':
      return `name.${DEFAULT_LOCALE} desc`;
    case 'Price, low to high':
      return 'price asc';
    case 'Price, high to low':
      return 'price desc';
    default:
      return undefined;
  }
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
  countriesF: Array(countriesFilter.length).fill(false),
  materialsF: Array(materials.length).fill(false),
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
    countriesF = Array(countriesFilter.length).fill(false),
    materialsF = Array(materials.length).fill(false),
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
        countriesF,
        materialsF,
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
    case 'SET_COUNTRIES':
      return { ...state, countriesF, page, loadingProducts };
    case 'SET_MATERIALS':
      return { ...state, materialsF, page, loadingProducts };
    case 'RESET_FILTERS':
      return { ...state, priceFilter, franchises, countriesF, materialsF, page, loadingProducts };
    case 'SET_PAGE':
      return { ...state, page, loadingProducts };
    default:
      return state;
  }
}

export const capitalizeFirstLetter = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);
