import 'server-only';

import { NotFound } from 'payload';

import { getPayload } from '@/shared/lib/payload';
import { errNotFound, errUnexpected, ok } from '@/shared/lib/result';
import { userProfileDto } from '../../model/dto';

export async function getUserProfileRepository({ userId }: { userId: number }) {
  try {
    const payload = await getPayload();

    const result = await payload.findByID({
      collection: 'users',
      id: userId,
    });

    return ok(userProfileDto(result));
  } catch (error) {
    if (error instanceof NotFound) return errNotFound('User not found');
    console.error(error);
    return errUnexpected('Failed to update user');
  }
}
