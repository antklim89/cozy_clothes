import { z } from 'zod/v4-mini';

export const LoginSchema = z.object({
  email: z.string().check(z.email()),
  password: z.string().check(z.minLength(8)),
});

export const RegisterSchema = z
  .object({
    confirmPassword: z.string(),
    ...LoginSchema.shape,
  })
  .check(
    z.refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
  );
