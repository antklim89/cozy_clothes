import { cache } from 'react';
import 'server-only';
import { z } from 'zod/v4-mini';

import { getMe } from '@/entities/user/services';
import { errUnauthenticated, errValidation } from '@/shared/lib/result';
import { updateUserProfileRepository } from './repositories/update-user-profile-repository';
import { UpdateUserSchema } from '../models/schemas';
import type { UpdateUserType } from '../models/types';

export const updateUserProfile = cache(async (input: UpdateUserType) => {
  const user = await getMe();
  if (!user) return errUnauthenticated();

  const { success, data: validatedInput, error } = UpdateUserSchema.safeParse(input);
  if (!success) return errValidation(z.prettifyError(error));

  const result = await updateUserProfileRepository({ userId: user.id, input: validatedInput });
  return result;
});
