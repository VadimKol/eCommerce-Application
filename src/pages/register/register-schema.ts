import { z } from 'zod';

import { calculateAge } from '@/common/utils';

export type Country = 'RU' | 'BY' | 'US';

const postalCodeSchemas: Record<Country, z.ZodString> = {
  RU: z.string().regex(/^\d{6}$/, 'Invalid postal code for Russia'),
  BY: z.string().regex(/^\d{6}$/, 'Invalid postal code for Belarus'),
  US: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid postal code for the USA'),
};

export const registerSchema = z
  .object({
    email: z.string().email('Email addresses must be properly formatted (e.g., user@example.com).'),
    password: z
      .string()
      .min(8, 'Minimum 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one digit')
      .refine(
        (val) => val[0] !== ' ' && val[val.length - 1] !== ' ',
        'Password must not contain leading or trailing whitespace.',
      ),
    name: z.string().regex(/^[A-Za-z]+$/, 'Must contain at least one character and no special characters or numbers'),

    surname: z
      .string()
      .regex(/^[A-Za-z]+$/, 'Must contain at least one character and no special characters or numbers'),
    streetBill: z.string().regex(/.+/, 'Must contain at least one character'),
    streetShip: z.string().regex(/.+/, 'Must contain at least one character'),
    cityBill: z
      .string()
      .regex(/^[A-Za-z\s]+$/, 'Must contain at least one character and no special characters or numbers'),
    cityShip: z
      .string()
      .regex(/^[A-Za-z\s]+$/, 'Must contain at least one character and no special characters or numbers'),
    age: z
      .string()
      .refine((date) => !Number.isNaN(Date.parse(date)), 'Invalid date format')
      .refine((date) => calculateAge(date), 'You must be at least 13 years old'),
    setAddress: z.boolean(),
    billdefault: z.boolean(),
    shipdefault: z.boolean(),
    apartamentBill: z.string(),
    apartamentShip: z.string(),
    countryBill: z.enum(['RU', 'BY', 'US']),
    countryShip: z.enum(['RU', 'BY', 'US']),
    postcodeBill: z.string(),
    postcodeShip: z.string(),
  })
  .superRefine((data, ctx) => {
    const billSchema = postalCodeSchemas[data.countryBill as Country];
    if (!billSchema.safeParse(data.postcodeBill).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid postal code for billing country: ${data.countryBill}`,
        path: ['postcodeBill'],
      });
    }

    // Validate shipping postal code
    const shipSchema = postalCodeSchemas[data.countryShip as Country];
    if (!shipSchema.safeParse(data.postcodeShip).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid postal code for shipping country: ${data.countryShip}`,
        path: ['postcodeShip'],
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
