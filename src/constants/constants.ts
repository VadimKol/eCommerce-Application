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
