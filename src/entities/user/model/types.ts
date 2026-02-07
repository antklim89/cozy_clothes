import type { z } from 'zod/v4-mini';

import type { AuthSchema, LoginSchema, RegisterSchema, UserSchema } from './schemas';

export type UserType = z.infer<typeof UserSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;
export type AuthType = z.infer<typeof AuthSchema>;

export interface UserProfileType {
  id: number;
  address: string;
  firstName: string;
  lastName: string;
  phone: string;
}
