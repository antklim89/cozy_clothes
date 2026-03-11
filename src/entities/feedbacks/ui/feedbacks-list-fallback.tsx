import { FeedbackItemFallback } from './feedback-item-fallback';
import { FeedbacksList } from './feedbacks-list';

export function FeedbacksListFallback() {
  return (
    <FeedbacksList>
      {Array.from({ length: 5 }, (_, idx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: ok
        <FeedbackItemFallback key={idx} />
      ))}
    </FeedbacksList>
  );
}
