import Link from 'next/link';

import type { FeedbackType } from '@/entities/feedbacks/model';
import { FeedbackItem, FeedbacksEmpty, FeedbacksList } from '@/entities/feedbacks/ui';
import { FeedbackDeleteButton } from '@/features/feedback-edit/ui';
import type { PaginatedData } from '@/shared/model/types/types';
import { Pagination } from '@/shared/ui/pagination';
import { QuerySort } from '@/shared/ui/query-sort';
import { sortOptions } from '../config/sort-options';

export function FeedbacksWidgetList({
  feedbacks,
  type = 'product',
}: {
  feedbacks: PaginatedData<FeedbackType>;
  type?: 'product' | 'personal';
}) {
  return (
    <>
      {feedbacks.docs.length > 0 && (
        <div className="mb-4 flex">
          <Pagination totalPages={feedbacks.totalPages} page={feedbacks.page} />
          <QuerySort options={sortOptions} />
        </div>
      )}
      <FeedbacksList>
        {feedbacks.docs.map(feedback => (
          <FeedbackItem
            title={
              type === 'product' ? (
                `${feedback.user.firstName || ''} ${feedback.user.lastName || ''}`.trim()
              ) : (
                <Link href={`/products/${feedback.product.id}`}>{feedback.product.title}</Link>
              )
            }
            feedback={feedback}
            key={feedback.id}
            deleteSlot={type === 'personal' ? <FeedbackDeleteButton productId={feedback.product.id} /> : null}
          />
        ))}
      </FeedbacksList>
      {feedbacks.docs.length === 0 && (
        <FeedbacksEmpty
          description={type === 'product' ? 'No one has left any feedback yet.' : "You haven't added any feedback yet."}
        />
      )}
    </>
  );
}
