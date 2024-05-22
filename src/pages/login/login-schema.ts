import { z } from 'zod';

export const loginSchema = z.object({
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
});

export type LoginSchema = z.infer<typeof loginSchema>;
