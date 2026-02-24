import 'server-only';

import { updateFeedbackCache } from '@/entities/feedbacks/services';
import { getMe } from '@/entities/user/services';
import { errUnauthenticated, errValidation } from '@/shared/lib/result';
import { addFeedbackRepository } from './repositories/add-feedback-repository';
import { removeFeedbackRepository } from './repositories/remove-feedback-repository';
import { CreateFeedbackInputSchema } from '../model/schemas';
import type { CreateFeedbackInputType } from '../model/types';

export async function addFeedback({ productId, input }: { productId: number; input: CreateFeedbackInputType }) {
  const { success, data: validatedInput } = await CreateFeedbackInputSchema.safeParseAsync(input);
  if (!success) return errValidation('Invalid quantity');

  const user = await getMe();
  if (user == null) return errUnauthenticated();

  const result = await addFeedbackRepository({
    productId,
    userId: user.id,
    input: validatedInput,
  });

  updateFeedbackCache({ productId });
  return result;
}

export async function removeFeedback({ productId }: { productId: number }) {
  const user = await getMe();
  if (user == null) return errUnauthenticated();

  const result = await removeFeedbackRepository({
    productId,
    userId: user.id,
  });

  updateFeedbackCache({ productId });
  return result;
}
