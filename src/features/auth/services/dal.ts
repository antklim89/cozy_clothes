import 'server-only';
import { cache } from 'react';

import type { AuthType } from '@/entities/user/model';
import { AuthSchema } from '@/entities/user/model';
import { err } from '@/shared/lib/result';
import { createUserRepository } from './repositories/create-user-repository';
import { loginRepository } from './repositories/login-repository';
import { logoutRepository } from './repositories/logout-repository';

export const register = cache(async ({ email, password }: AuthType) => {
  const { success, data: validatedInput, error } = AuthSchema.safeParse({ email, password });
  if (!success) return err({ type: 'validation', message: error.message });

  const createUserResult = await createUserRepository(validatedInput);
  if (createUserResult.type === 'error') return createUserResult;

  const loginResult = await loginRepository(validatedInput);
  return loginResult;
});

export const login = cache(async ({ email, password }: AuthType) => {
  const { success, data: validatedInput, error } = AuthSchema.safeParse({ email, password });
  if (!success) return err({ type: 'validation', message: error.message });

  const loginResult = await loginRepository(validatedInput);
  return loginResult;
});

export const logout = cache(async () => {
  await logoutRepository();
});
