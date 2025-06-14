'use server';
import 'server-only';
import { cache } from 'react';
import { AuthSchema, type AuthType } from '@/src/entities/user/model';
import { createUserRepository, loginRepository, logoutRepository } from '@/src/entities/user/repositories';
import { err } from '@/src/shared/lib/result';

export const registerAction = cache(async ({ email, password }: AuthType) => {
  const { success, data: validatedInput, error } = AuthSchema.safeParse({ email, password });
  if (!success) return err({ type: 'validation', message: error.message });

  const createUserResult = await createUserRepository(validatedInput);
  if (createUserResult.type === 'error') return createUserResult;

  const loginResult = await loginRepository(validatedInput);
  return loginResult;
});

export const loginAction = cache(async ({ email, password }: AuthType) => {
  const { success, data: validatedInput, error } = AuthSchema.safeParse({ email, password });
  if (!success) return err({ type: 'validation', message: error.message });

  const loginResult = await loginRepository(validatedInput);
  return loginResult;
});

export const logoutAction = cache(async () => {
  await logoutRepository();
});
