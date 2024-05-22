import { registerSchema } from '@/pages/register/register-schema';

test('Register test with good values', () => {
  expect(() =>
    registerSchema.parse({
      email: 'user@example.com',
      password: 'asdfasdfA1',
      name: 'abc',
      surname: 'abc',
      streetBill: '1',
      streetShip: '1',
      cityBill: 'abc',
      cityShip: 'abc',
      age: '2011-05-20',
      setAddress: false,
      billdefault: false,
      shipdefault: false,
      apartamentBill: '123',
      apartamentShip: '123',
      countryBill: 'US',
      countryShip: 'US',
      postcodeBill: '12345',
      postcodeShip: '12345',
    }),
  ).not.toThrow();
});

test('Register test with bad age', () => {
  expect(() =>
    registerSchema.parse({
      email: 'user@example.com',
      password: 'asdfasdfA1',
      name: 'abc',
      surname: 'abc',
      streetBill: '1',
      streetShip: '1',
      cityBill: 'abc',
      cityShip: 'abc',
      age: '2024-05-20',
      setAddress: false,
      billdefault: false,
      shipdefault: false,
      apartamentBill: '123',
      apartamentShip: '123',
      countryBill: 'US',
      countryShip: 'US',
      postcodeBill: '12345',
      postcodeShip: '12345',
    }),
  ).toThrow();
});
