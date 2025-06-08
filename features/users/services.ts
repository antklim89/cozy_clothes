import '@/lib/server-only';
import { login as payloadLogin, logout as payloadLogout } from '@payloadcms/next/auth';
import { cookies, headers } from 'next/headers';
import { cache } from 'react';
import { getPayload } from 'payload';
import type { ValidationError } from 'payload';
import { addAuthenticatedCookie, removeAuthenticatedCookie } from '@/lib/auth';
import { err, ok } from '@/lib/result';
import type { PromiseResult } from '@/lib/result';
import type { User } from '@/payload-types';
import config from '@/payload.config';
import { Users } from './collections/Users';
import type { UserType } from './types';


export const createUser = cache(async ({ email, password }: { email: string; password: string }): PromiseResult<UserType, 'unexpected' | 'validation'> => {
  try {
    const payload = await getPayload({ config });

    const result = await payload.create({
      collection: Users.slug,
      data: {
        email,
        password,
      },
    });
    addAuthenticatedCookie(await cookies());

    return ok({
      id: result.id,
      email: result.email,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      const issues = (error as ValidationError).data.errors.reduce((acc, value) => {
        acc[value.path] = value.message;
        return acc;
      }, {} as Record<string, string>);

      return err({ type: 'validation', message: error.message, errors: issues });
    }

    console.error('Error create user:', error);
    return err({ type: 'unexpected', message: 'Failed to create user' });
  }
});

export const login = cache(async ({ email, password }: { email: string; password: string }): PromiseResult<UserType, 'unexpected'> => {
  try {
    const result = await payloadLogin({
      collection: 'users',
      config,
      email,
      password,
    });

    const user = result.user as User;

    addAuthenticatedCookie(await cookies());

    return ok({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error instanceof Error) {
      return err({ type: 'unexpected', message: error.message });
    }
    return err({ type: 'unexpected', message: 'Failed to login' });
  }
});

export const logout = cache(async () => {
  await payloadLogout({ config });

  removeAuthenticatedCookie(await cookies());
});

export const authService = cache(async (): Promise<UserType | null> => {
  try {
    const payload = await getPayload({ config });
    const result = await payload.auth({ headers: await headers() });

    if (result.user == null) return null;
    if (result.user.collection !== Users.slug) return null;

    return {
      id: result.user.id,
      email: result.user.email,
    };
  } catch {
    return null;
  }
});
