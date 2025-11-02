import { Label } from '@/shared/ui/label';
import { Skeleton } from '@/shared/ui/skeleton';

export function ProductCountrySelectFallback() {
  return (
    <Label className="flex flex-col gap-2">
      <span>Countries</span>
      <div className="flex flex-col gap-2 rounded-md border">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: 8 }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: it's fallback
          <Skeleton className="h-4 w-full" key={i} />
        ))}
      </div>
    </Label>
  );
}
