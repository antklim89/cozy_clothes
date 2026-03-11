import { FeedbacksListFallback } from '@/entities/feedbacks/ui';
import { FeedbacksWidget } from '@/widgets/feedbacks-widget/ui';

function Loading() {
  return (
    <FeedbacksWidget title="My Feedbacks">
      <FeedbacksListFallback />
    </FeedbacksWidget>
  );
}

export default Loading;
