import { MessageCircleOffIcon } from 'lucide-react';

import { Card } from '@/shared/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shared/ui/empty';

export function OrdersEmpty() {
  return (
    <Card>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default">
            <MessageCircleOffIcon />
          </EmptyMedia>
          <EmptyTitle>There are no orders yet.</EmptyTitle>
          <EmptyDescription>You haven't made any order yet.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Card>
  );
}
