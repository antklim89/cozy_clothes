import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { ItemGroup } from '@/shared/ui/item';
import type { OrderType } from '../model/types';

export function Order({ order }: { order: OrderType }) {
  const orderStatus = orderStatusMap[order.status];

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle>Order №{order.id}</CardTitle>
        <Badge className={cn(orderStatus.color)}>{orderStatus.text}</Badge>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {order.cart.map(cartItem => (
            <Link href={`/products/${cartItem.product.id}`} key={cartItem.product.id}>
              {cartItem.product.title}
            </Link>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}

const orderStatusMap: Record<OrderType['status'], { text: string; color: string }> = {
  waiting_for_payment: { color: 'text-yellow-600', text: 'Waiting for payment' },
  canceled: { color: 'text-red-600', text: 'Canceled' },
  delivered: { color: 'text-green-600', text: 'Delivered' },
  gathering: { color: 'text-yellow-600', text: 'Gathering' },
  in_the_way: { color: 'text-yellow-600', text: 'In the way' },
};
