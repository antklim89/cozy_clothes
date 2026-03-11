import type { ReactNode } from 'react';

import { Item, ItemContent, ItemHeader, ItemTitle } from '@/shared/ui/item';

export function FeedbacksWidget({
  title,
  totalFeedbacks,
  children,
}: {
  title: string;
  totalFeedbacks?: number;
  children: ReactNode;
}) {
  return (
    <Item className="container my-8 w-full">
      <ItemHeader className="flex-col items-start">
        <ItemTitle className="text-2xl">{title}</ItemTitle>
        <p>Total feedbacks: {totalFeedbacks ? totalFeedbacks : '...'}</p>
      </ItemHeader>

      <ItemContent>{children}</ItemContent>
    </Item>
  );
}
