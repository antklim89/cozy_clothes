import { Skeleton } from '@/src/shared/ui/skeleton';


export function ProductCategoryNavBarFallback() {
  return (
    <div className="container my-4 flex gap-4">
      {Array.from({ length: 8 }, (_, index) => (
        <Skeleton className="h-20 w-full" key={index} />
      ))}
    </div>
  );
}
