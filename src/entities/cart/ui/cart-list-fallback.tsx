import { Item, ItemContent, ItemHeader } from '@/shared/ui/item';
import { Skeleton } from '@/shared/ui/skeleton';
import { CartList } from './cart-list';

export function CartListFallback() {
  return (
    <CartList>
      {Array.from({ length: 4 }, (_, idx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <ok>
        <Item key={idx} variant="outline">
          <ItemHeader>
            <Skeleton className="h-11 w-full" />
          </ItemHeader>
          <ItemContent>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-8 w-1/2" />
          </ItemContent>
        </Item>
      ))}
    </CartList>
  );
}
