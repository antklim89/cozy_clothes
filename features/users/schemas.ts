import { z } from 'zod';


export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  confirmPassword: z.string().min(8),
})
  .merge(LoginSchema)
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const AuthSchema = LoginSchema;
export type AuthSchemaType = z.infer<typeof AuthSchema>;
