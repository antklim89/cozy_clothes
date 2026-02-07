import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errNotFound, errUnexpected, ok } from '@/shared/lib/result';
import type { UpdateUserType } from '../../models/types';

export async function updateUserProfileRepository({ userId, input }: { userId: number; input: UpdateUserType }) {
  try {
    const payload = await getPayload();

    const result = await payload.update({
      collection: 'users',
      data: input,
      select: {},
      where: {
        id: {
          equals: userId,
        },
      },
    });
    if (result.docs.length === 0) return errNotFound('User profile was not updated.');

    return ok(null);
  } catch (error) {
    console.error(error);
    return errUnexpected('Failed to update user');
  }
}
