import 'server-only';
import type { ValidationError } from 'payload';
import { getPayload } from '@/src/shared/lib/payload';
import { err, ok, type PromiseResult } from '@/src/shared/lib/result';
import { Users } from '../model/collections';
import type { AuthType, UserType } from '../model/types';


export async function createUserRepository({ email, password }: AuthType): PromiseResult<UserType, 'unexpected' | 'validation'> {
  try {
    const payload = await getPayload();

    const result = await payload.create({
      collection: Users.slug,
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
      const issues = (error as ValidationError).data.errors.reduce((acc, value) => {
        acc[value.path] = value.message;
        return acc;
      }, {} as Record<string, string>);

      return err({ type: 'validation', message: error.message, errors: issues });
    }

    console.error('Error create user:', error);
    return err({ type: 'unexpected', message: 'Failed to create user' });
  }
}
