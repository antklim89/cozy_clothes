import { MessageCircleOffIcon } from 'lucide-react';

import { Card } from '@/shared/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shared/ui/empty';

export function FeedbacksEmpty({ description }: { description: string }) {
  return (
    <Card>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default">
            <MessageCircleOffIcon />
          </EmptyMedia>
          <EmptyTitle>There are no feedbacks yet.</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Card>
  );
}
