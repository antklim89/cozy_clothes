import { FeedbacksListFallback } from '@/entities/feedbacks/ui';
import { FeedbackCreateFallback } from '@/features/feedback-edit/ui';
import { FeedbacksWidget } from '@/widgets/feedbacks-widget/ui';
import { ProductFallback } from '@/widgets/product/ui';

function Loading() {
  return (
    <div className="container flex flex-col gap-4">
      <ProductFallback />
      <FeedbackCreateFallback />
      <FeedbacksWidget title="Feedbacks">
        <FeedbacksListFallback />
      </FeedbacksWidget>
    </div>
  );
}

export default Loading;
