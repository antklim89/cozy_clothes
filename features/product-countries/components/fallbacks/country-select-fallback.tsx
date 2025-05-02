import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';


export function CountrySelectFallback() {
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
