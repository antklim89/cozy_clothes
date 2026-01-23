import 'server-only';
import type { ValidationError } from 'payload';

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
    if (error instanceof Error && error.name === 'ValidationError') {
      const issues = (error as ValidationError).data.errors.reduce(
        (acc, value) => {
          acc[value.path] = value.message;
          return acc;
        },
        {} as Record<string, string>,
      );

      return errValidation(error.message, { errors: issues });
    }

    console.error('Error create user:', error);
    return errUnexpected('Failed to create user');
  }
}
