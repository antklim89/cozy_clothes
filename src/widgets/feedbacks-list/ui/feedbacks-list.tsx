import type { FeedbackType } from '@/entities/feedbacks/model';
import { FeedbackItem, FeedbacksEmpty } from '@/entities/feedbacks/ui';
import { FeedbackDeleteButton } from '@/features/feedback-edit/ui';
import type { PaginatedData } from '@/shared/model/types/types';
import { Item, ItemContent, ItemHeader, ItemTitle } from '@/shared/ui/item';
import { Pagination } from '@/shared/ui/pagination';
import { QuerySort } from '@/shared/ui/query-sort';
import { sortOptions } from '../config/sort-options';

export function FeedbacksList({
  feedbacks,
  type = 'product',
}: {
  feedbacks: PaginatedData<FeedbackType>;
  type?: 'product' | 'personal';
}) {
  return (
    <Item className="container my-8 w-full">
      <ItemHeader className="flex-col items-start">
        <ItemTitle className="text-2xl">{type === 'product' ? 'Feedbacks' : 'My feedbacks'}</ItemTitle>
        <p>Total feedbacks: {feedbacks.totalDocs}</p>
      </ItemHeader>

      <ItemContent className="gap-4">
        {feedbacks.docs.length > 0 && (
          <div className="flex">
            <Pagination totalPages={feedbacks.totalPages} page={feedbacks.page} />
            <QuerySort options={sortOptions} />
          </div>
        )}
        <div className="flex w-full flex-col gap-4">
          {feedbacks.docs.map(feedback => (
            <FeedbackItem
              feedback={feedback}
              key={feedback.id}
              deleteFeedback={type === 'personal' ? <FeedbackDeleteButton productId={feedback.product.id} /> : null}
              type={type}
            />
          ))}
        </div>
        {feedbacks.docs.length === 0 && (
          <FeedbacksEmpty
            description={
              type === 'product' ? 'No one has left any feedback yet.' : "You haven't added any feedback yet."
            }
          />
        )}
      </ItemContent>
    </Item>
  );
}
