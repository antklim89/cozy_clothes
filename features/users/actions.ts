'use server';
import '@/lib/server-only';
import { err } from '@/lib/result';
import { AuthSchema } from './schemas';
import {
  auth as authService,
  createUser as createUserService,
  login as loginService,
  logout as logoutService,
} from './services';


export async function createUser({ email, password }: { email: string; password: string }) {
  const { success, data, error } = AuthSchema.safeParse({ email, password });
  if (!success) return err({ type: 'validation', message: error.message });

  const createUserResult = await createUserService(data);
  if (createUserResult.type === 'error') return createUserResult;

  const loginResult = await loginService(data);
  return loginResult;
}

export async function login({ email, password }: { email: string; password: string }) {
  const { success, data, error } = AuthSchema.safeParse({ email, password });
  if (!success) return err({ type: 'validation', message: error.message });

  const loginResult = await loginService(data);
  return loginResult;
}

export async function logout() {
  await logoutService();
}

export async function auth() {
  return authService();
}
