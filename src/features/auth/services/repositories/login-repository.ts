import config from '@payload-config';
import { login as payloadLogin } from '@payloadcms/next/auth';
import 'server-only';

import { ValidationError } from 'payload';

import type { AuthType } from '@/entities/user/model';
import { errUnexpected, errValidation, ok } from '@/shared/lib/result';
import type { User } from '@/shared/model/types/payload-types.generated';

export async function loginRepository({ email, password }: AuthType) {
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
    if (error instanceof ValidationError) {
      return errValidation(error.message, { issues: error.data.errors });
    }
    console.error(error);
    return errUnexpected(error instanceof Error ? error.message : 'Failed to login');
  }
}
