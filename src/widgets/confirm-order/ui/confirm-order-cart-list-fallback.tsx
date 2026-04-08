import { Item, ItemContent, ItemGroup, ItemHeader } from '@/shared/ui/item';
import { Skeleton } from '@/shared/ui/skeleton';

export function ConfirmOrderCartListFallback() {
  return (
    <ItemGroup>
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
    </ItemGroup>
  );
}
