import {
  calculateAge,
  capitalizeFirstLetter,
  fandoms,
  getCheckboxFilter,
  getSort,
  initialState,
  PRICE_FILTER_MIN,
  reducerCatalog,
  sortingTypes,
  StatusError,
} from '@/common/utils';

describe('Testing utils functions', () => {
  const franchises = Array<boolean>(fandoms.length).fill(false);
  it('should be false, because younger then 13 years old', () => {
    expect(calculateAge(String(new Date()))).toBeFalsy();
  });

  it('should be true, because older then 13 years old', () => {
    expect(calculateAge('01-01-2000')).toBeTruthy();
  });

  it('should be empty', () => {
    expect(getCheckboxFilter(franchises, 'Fandom')).toBe('');
  });

  it('should be firstFandom', () => {
    const firstFandom = fandoms[0];
    franchises[0] = true;
    expect(getCheckboxFilter(franchises, 'Fandom')).toBe(`variants.attributes.Fandom:"${firstFandom}"`);
  });

  it('should be undefined, because this type is not in sortingTypes', () => {
    expect(getSort('Sort')).toBeUndefined();
  });

  it('should sort price in ascending order', () => {
    expect(getSort(sortingTypes[2] || 'Price, low to high')).toBe('price asc');
  });

  it('should set page to 1', () => {
    expect(reducerCatalog(initialState, { type: 'SET_PAGE', page: 1 })).toEqual({ ...initialState, page: 1 });
  });

  it('should set price to the half of the maximum', () => {
    expect(
      reducerCatalog(initialState, {
        type: 'SET_PRICE',
        priceFilter: [PRICE_FILTER_MIN, Math.floor(PRICE_FILTER_MIN / 2)],
      }),
    ).toEqual({ ...initialState, priceFilter: [PRICE_FILTER_MIN, Math.floor(PRICE_FILTER_MIN / 2)] });
  });

  it('should set status code correctly', () => {
    const error = new StatusError('Mock error', 404);
    expect(error.statusCode).toBe(404);
  });

  it('should capitalize first letter', () => {
    expect(capitalizeFirstLetter('test')).toBe('Test');
  });
});
