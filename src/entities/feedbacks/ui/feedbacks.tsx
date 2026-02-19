import type { PaginatedData } from '@/shared/model/types/types';
import { Item, ItemContent, ItemHeader, ItemTitle } from '@/shared/ui/item';
import { FeedbackItem } from './feedback-item';
import { FeedbacksEmpty } from './feedbacks-empty';
import type { FeedbackType } from '../model/types';

export function Feedbacks({ feedbacks }: { feedbacks: PaginatedData<FeedbackType> }) {
  return (
    <Item className="container my-8 flex w-full flex-col">
      <ItemHeader className="flex flex-col gap-4">
        <ItemTitle className="text-3xl">Users Feedbacks</ItemTitle>
        <p>Total feedbacks: {feedbacks.totalDocs}</p>
      </ItemHeader>

      <ItemContent className="flex w-full gap-4">
        {feedbacks.docs.length === 0 && <FeedbacksEmpty />}

        {feedbacks.docs.map(feedback => (
          <FeedbackItem feedback={feedback} key={feedback.id} />
        ))}
      </ItemContent>
    </Item>
  );
}
