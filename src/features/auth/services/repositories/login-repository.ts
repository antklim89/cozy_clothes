import 'server-only';
import { login as payloadLogin } from '@payloadcms/next/auth';
import type { User } from '@/payload-types';
import config from '@/payload.config';
import type { AuthType, UserType } from '@/src/entities/user/model';
import { err, ok, type PromiseResult } from '@/src/shared/lib/result';

export async function loginRepository({ email, password }: AuthType): PromiseResult<UserType, 'unexpected'> {
  try {
    const result = await payloadLogin({
      collection: 'users',
      config,
      email,
      password,
    });

    const user = result.user as User;

    return ok({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    return err({ type: 'unexpected', message: error instanceof Error ? error.message : 'Failed to login' });
  }
}
