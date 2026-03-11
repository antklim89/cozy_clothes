import { feedbackCache, getFeedbacks } from '@/entities/feedbacks/services';
import type { PayloadOptions } from '@/shared/model/types/types';
import { ErrorComponent } from '@/shared/ui/error-component';
import { FeedbacksWidget, FeedbacksWidgetList } from '@/widgets/feedbacks-widget/ui';

export async function FeedbacksListSection({ productId, options }: { productId: number; options: PayloadOptions }) {
  'use cache';
  feedbackCache({ productId });

  const { result: feedbacks, error } = await getFeedbacks({ productId, options });
  if (error) return <ErrorComponent error={error} />;

  return (
    <FeedbacksWidget title="Feedbacks" totalFeedbacks={feedbacks.totalDocs}>
      <FeedbacksWidgetList feedbacks={feedbacks} type="product" />
    </FeedbacksWidget>
  );
}
