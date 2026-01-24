import 'server-only';
import { ValidationError } from 'payload';

import type { AuthType, UserType } from '@/entities/user/model';
import { getPayload } from '@/shared/lib/payload';
import type { PromiseResult } from '@/shared/lib/result';
import { errUnexpected, errValidation, ok } from '@/shared/lib/result';

export async function createUserRepository({
  email,
  password,
}: AuthType): PromiseResult<UserType, 'unexpected' | 'validation'> {
  try {
    const payload = await getPayload();

    const result = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
      },
    });

    return ok({
      id: result.id,
      email: result.email,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return errValidation(error.message, { issues: error.data.errors });
    }

    console.error('Error create user:', error);
    return errUnexpected('Failed to create user');
  }
}
