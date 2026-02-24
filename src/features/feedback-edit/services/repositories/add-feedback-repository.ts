import 'server-only';
import { cache } from 'react';

import { feedbackDto } from '@/entities/feedbacks/model';
import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';
import type { CreateFeedbackInputType } from '../../model/types';

export const addFeedbackRepository = cache(
  async ({ productId, userId, input }: { productId: number; userId: number; input: CreateFeedbackInputType }) => {
    try {
      const payload = await getPayload();

      const payloadMediaResult =
        input.images == null || input.images.length === 0
          ? undefined
          : await Promise.all(
              input.images.map(async image =>
                payload.create({
                  collection: 'feedback-media',
                  data: {} as never,
                  file: {
                    data: Buffer.from(await image.arrayBuffer()),
                    mimetype: image.type,
                    name: image.name,
                    size: image.size,
                  },
                }),
              ),
            );

      const payloadResult = await payload.create({
        collection: 'feedback',
        depth: 1,
        data: {
          user: userId,
          product: productId,
          rating: input.rating,
          negativeReview: input.negativeReview,
          positiveReview: input.positiveReview,
          review: input.review,
          images: payloadMediaResult,
        },
      });

      const feedback = feedbackDto(payloadResult);

      return ok(feedback);
    } catch (error) {
      console.error(error);
      return errUnexpected('Failed to add feedback.');
    }
  },
);
