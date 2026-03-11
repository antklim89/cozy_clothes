import { FeedbackCreateFallback } from '@/features/feedback-edit/ui';
import { FeedbacksListFallback } from '@/widgets/feedbacks-list/ui';
import { ProductFallback } from '@/widgets/product/ui';

function Loading() {
  return (
    <div className="container flex flex-col gap-4">
      <ProductFallback />
      <FeedbackCreateFallback />
      <FeedbacksListFallback />
    </div>
  );
}

export default Loading;
