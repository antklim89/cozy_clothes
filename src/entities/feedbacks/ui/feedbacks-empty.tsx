import { MessageCircleOffIcon } from 'lucide-react';

import { Card } from '@/shared/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shared/ui/empty';

export function FeedbacksEmpty() {
  return (
    <Card>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default">
            <MessageCircleOffIcon />
          </EmptyMedia>
          <EmptyTitle>There are no feedbacks yet.</EmptyTitle>
          <EmptyDescription>Nobody has left a feedback yet. Be the first to share your thoughts!</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Card>
  );
}
