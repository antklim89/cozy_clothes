import type { PaginatedData } from '@/shared/model/types/types';
import { Item, ItemContent, ItemHeader, ItemTitle } from '@/shared/ui/item';
import { FeedbackItem } from './feedback-item';
import type { FeedbackType } from '../model/types';

export function Feedbacks({
  feedbacks,
  type = 'product',
}: {
  feedbacks: PaginatedData<FeedbackType>;
  type?: 'product' | 'personal';
}) {
  return (
    <Item className="container my-8 flex w-full flex-col">
      <ItemHeader className="mb-4 flex flex-col gap-2 self-start">
        <ItemTitle className="text-2xl">{type === 'product' ? 'Feedbacks' : 'My feedbacks'}</ItemTitle>
        <p>Total feedbacks: {feedbacks.totalDocs}</p>
      </ItemHeader>

      <ItemContent className="flex w-full gap-4">
        {feedbacks.docs.map(feedback => (
          <FeedbackItem feedback={feedback} key={feedback.id} />
        ))}
      </ItemContent>
    </Item>
  );
}
