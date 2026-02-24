import { cacheTag, updateTag } from 'next/cache';

const FEEDBACK_CACHE_TAG = 'FEEDBACK';

export function feedbackCache({ productId }: { productId: number }) {
  cacheTag(`${FEEDBACK_CACHE_TAG}:${productId}`);
}

export function updateFeedbackCache({ productId }: { productId: number }) {
  updateTag(`${FEEDBACK_CACHE_TAG}:${productId}`);
}
