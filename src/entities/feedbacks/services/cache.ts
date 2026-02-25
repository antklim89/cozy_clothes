import { cacheLife, cacheTag, updateTag } from 'next/cache';

const FEEDBACK_CACHE_TAG = 'FEEDBACK';

export function feedbackCache({ productId }: { productId: number }) {
  cacheLife('seconds');
  cacheTag(`${FEEDBACK_CACHE_TAG}:${productId}`);
}

export function updateFeedbackCache({ productId }: { productId: number }) {
  updateTag(`${FEEDBACK_CACHE_TAG}:${productId}`);
}
