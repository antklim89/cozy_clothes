import { ItemGroup } from '@/shared/ui/item';
import { Skeleton } from '@/shared/ui/skeleton';

export function CartWidgetListFallback() {
  return (
    <ItemGroup className="flex flex-col gap-4">
      {Array.from({ length: 3 }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: it's fallback
        <Skeleton className="h-52 w-full" key={i} />
      ))}
    </ItemGroup>
  );
}
