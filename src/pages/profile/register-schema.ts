import { z } from 'zod';

import { calculateAge } from '@/common/utils';

export const registerSchema = z.object({
  email: z.string().email('Email address must be properly formatted (e.g., user@example.com)'),
  name: z.string().regex(/^[A-Za-z]+$/, 'Must contain at least one character and no special characters or numbers'),
  surname: z.string().regex(/^[A-Za-z]+$/, 'Must contain at least one character and no special characters or numbers'),
  age: z
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), 'Invalid date format')
    .refine((date) => calculateAge(date), 'You must be at least 13 years old'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
