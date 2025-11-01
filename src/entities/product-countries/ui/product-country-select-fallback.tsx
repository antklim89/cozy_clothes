import { Label } from '@/shared/ui/label';
import { Skeleton } from '@/shared/ui/skeleton';


export function ProductCountrySelectFallback() {
  return (
    <Label className="flex flex-col gap-2">
      <span>Countries</span>
      <div className="flex flex-col gap-2 border rounded-md">
        <Skeleton className="w-full h-10" />
        {Array.from({ length: 8 }, (_, i) => (
          <Skeleton className="w-full h-4" key={i} />
        ))}
      </div>
    </Label>
  );
}
