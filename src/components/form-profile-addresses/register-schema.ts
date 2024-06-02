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
    const billSchema = postalCodeSchemas[data.country as Country];
    if (!billSchema.safeParse(data.postcode).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid postal code for billing country: ${data.country}`,
        path: ['postcodeBill'],
      });
    }

    // Validate shipping postal code
    const shipSchema = postalCodeSchemas[data.country as Country];
    if (!shipSchema.safeParse(data.postcode).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid postal code for shipping country: ${data.country}`,
        path: ['postcodeShip'],
      });
    }
  });

export type FormValues = z.infer<typeof registerSchema>;
