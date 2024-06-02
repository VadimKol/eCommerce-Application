import { z } from 'zod';

export type Country = 'RU' | 'BY' | 'US';

const postalCodeSchemas: Record<Country, z.ZodString> = {
  RU: z.string().regex(/^\d{6}$/, 'Invalid postal code for Russia'),
  BY: z.string().regex(/^\d{6}$/, 'Invalid postal code for Belarus'),
  US: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid postal code for the USA'),
};

export const registerSchema = z
  .object({
    street: z.string().regex(/.+/, 'Must contain at least one character'),
    city: z.string().regex(/^[A-Za-z\s]+$/, 'Must contain at least one character and no special characters or numbers'),
    default: z.boolean(),
    apartment: z.string(),
    country: z.enum(['RU', 'BY', 'US']),
    postcode: z.string(),
  })
  .superRefine((data, ctx) => {
    const addressSchema = postalCodeSchemas[data.country as Country];
    if (!addressSchema.safeParse(data.postcode).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid postal code for country: ${data.country}`,
        path: ['postcode'],
      });
    }
  });

export type FormValues = z.infer<typeof registerSchema>;
