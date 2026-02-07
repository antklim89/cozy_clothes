import 'server-only';
import { cache } from 'react';

import { errUnauthenticated } from '@/shared/lib/result';
import { getMeRepository } from './repositories/get-me-repository';
import { getUserProfileRepository } from './repositories/get-user-profile-repository';
import { hasSessionRepository } from './repositories/has-session-repository';

export const getMe = cache(() => {
  return getMeRepository();
});

export const hasSession = cache(() => {
  return hasSessionRepository();
});

export const getUserProfile = cache(async () => {
  const user = await getMe();
  if (!user) return errUnauthenticated();

  const result = await getUserProfileRepository({ userId: user.id });
  return result;
});
