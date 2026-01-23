import 'server-only';
import config from '@payload-config';
import { login as payloadLogin } from '@payloadcms/next/auth';

import type { AuthType, UserType } from '@/entities/user/model';
import type { PromiseResult } from '@/shared/lib/result';
import { errUnexpected, ok } from '@/shared/lib/result';
import type { User } from '@/shared/model/types/payload-types.generated';

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
    return errUnexpected(error instanceof Error ? error.message : 'Failed to login');
  }
}
