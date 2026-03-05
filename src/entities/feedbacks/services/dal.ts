import 'server-only';
import { cache } from 'react';
import { z } from 'zod/v4-mini';

import { getMe } from '@/entities/user/services';
import { errUnauthenticated } from '@/shared/lib/result';
import { PayloadOptionsSchema } from '@/shared/model/schemas/payload-options-schema';
import type { PayloadOptions } from '@/shared/model/types/types';
import { feedbackCache } from './cache';
import { getFeedbacksRepository } from './repositories/get-feedbacks-repository';
import { getMyFeedbacksRepository } from './repositories/get-my-feedbacks-repository';

const GetFeedbacksInputSchema = z.object({
  productId: z.number().check(z.positive()),
  options: z.pick(PayloadOptionsSchema, { page: true, sort: true }),
});
const GetMyFeedbacksInputSchema = z.pick(GetFeedbacksInputSchema, { options: true });

export const getFeedbacks = cache(
  async (input: { productId: number; options: Pick<PayloadOptions, 'page' | 'sort'> }) => {
    'use cache';

    const { productId, options } = await GetFeedbacksInputSchema.parseAsync(input);
    feedbackCache({ productId });

    const result = await getFeedbacksRepository({ productId, options });
    return result;
  },
);

export const getMyFeedbacks = cache(async (input: { options: Pick<PayloadOptions, 'page' | 'sort'> }) => {
  const { options } = await GetMyFeedbacksInputSchema.parseAsync(input);

  const user = await getMe();
  if (user == null) return errUnauthenticated();

  const result = await getMyFeedbacksRepository({ userId: user.id, options });
  return result;
});
