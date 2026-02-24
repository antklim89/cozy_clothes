import { z } from 'zod/v4-mini';

import { MAX_IMAGE_SIZE } from '@/entities/feedbacks/config';

export const CreateFeedbackInputSchema = z.object({
  rating: z.number().check(z.minimum(1), z.maximum(5)),
  review: z.optional(z.string().check(z.maxLength(10000))),
  negativeReview: z.optional(z.string().check(z.maxLength(10000))),
  positiveReview: z.optional(z.string().check(z.maxLength(10000))),
  images: z.optional(z.array(z.file().check(z.maxSize(MAX_IMAGE_SIZE)))),
});
