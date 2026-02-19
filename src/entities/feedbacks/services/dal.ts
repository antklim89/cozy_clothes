import 'server-only';
import { cache } from 'react';

import { getFeedbacksRepository } from './repositories/get-feedback-repository';

export const getFeedbacks = cache(async ({ productId }: { productId: number }) => {
  const result = await getFeedbacksRepository({ productId });
  return result;
});
