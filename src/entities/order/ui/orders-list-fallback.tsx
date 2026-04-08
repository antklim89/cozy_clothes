import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { OrdersList } from './orders-list';

export function OrdersListFallback() {
  return (
    <OrdersList>
      {Array.from({ length: 4 }, (_, idx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: ok
        <Card key={idx}>
          <CardHeader className="flex justify-between">
            <CardTitle>Order № ...</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-48 w-full" />
          </CardContent>
        </Card>
      ))}
    </OrdersList>
  );
}
