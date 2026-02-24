import 'server-only';
import { cache } from 'react';

import { getMe } from '@/entities/user/services';
import { errUnauthenticated } from '@/shared/lib/result';
import { getFeedbacksRepository } from './repositories/get-feedbacks-repository';
import { getMyFeedbacksRepository } from './repositories/get-my-feedbacks-repository';

export const getFeedbacks = cache(async ({ productId }: { productId: number }) => {
  const result = await getFeedbacksRepository({ productId });
  return result;
});

export const getMyFeedbacks = cache(async () => {
  const user = await getMe();
  if (user == null) return errUnauthenticated();

  const result = await getMyFeedbacksRepository({ userId: user.id });
  return result;
});
