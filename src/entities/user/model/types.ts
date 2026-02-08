import type { z } from 'zod/v4-mini';

import type { AuthSchema, LoginSchema, RegisterSchema } from './schemas';

export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;
export type AuthType = z.infer<typeof AuthSchema>;

export interface UserType {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface UserProfileType {
  id: number;
  address: string;
  firstName: string;
  lastName: string;
  phone: string;
}
