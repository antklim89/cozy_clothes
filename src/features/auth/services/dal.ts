import 'server-only';
import { cache } from 'react';
import { z } from 'zod/v4-mini';

import type { AuthType } from '@/entities/user/model';
import { AuthSchema } from '@/entities/user/model';
import { errValidation } from '@/shared/lib/result';
import { createUserRepository } from './repositories/create-user-repository';
import { loginRepository } from './repositories/login-repository';
import { logoutRepository } from './repositories/logout-repository';

export const register = cache(async ({ email, password }: AuthType) => {
  const { success, data: validatedInput, error } = AuthSchema.safeParse({ email, password });
  if (!success) return errValidation(z.prettifyError(error));

  const createUserResult = await createUserRepository(validatedInput);
  if (createUserResult.error) return createUserResult;

  const loginResult = await loginRepository(validatedInput);
  return loginResult;
});

export const login = cache(async ({ email, password }: AuthType) => {
  const { success, data: validatedInput, error } = AuthSchema.safeParse({ email, password });
  if (!success) return errValidation(z.prettifyError(error));

  const loginResult = await loginRepository(validatedInput);
  return loginResult;
});

export const logout = cache(async () => {
  await logoutRepository();
});
