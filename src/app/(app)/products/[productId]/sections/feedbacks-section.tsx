import { feedbackCache, getFeedbacks } from '@/entities/feedbacks/services';
import type { PayloadOptions } from '@/shared/model/types/types';
import { ErrorComponent } from '@/shared/ui/error-component';
import { FeedbacksList } from '@/widgets/feedbacks-list/ui';

export async function FeedbacksListSection({ productId, options }: { productId: number; options: PayloadOptions }) {
  'use cache';
  feedbackCache({ productId });

  const { result: feedbacks, error } = await getFeedbacks({ productId, options });
  if (error) return <ErrorComponent error={error} />;

  return <FeedbacksList feedbacks={feedbacks} />;
}
