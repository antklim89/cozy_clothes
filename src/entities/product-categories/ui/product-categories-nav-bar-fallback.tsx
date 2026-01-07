import { Skeleton } from '@/shared/ui/skeleton';

export function ProductCategoriesNavBarFallback() {
  return (
    <div className="container my-4 flex gap-4">
      {Array.from({ length: 8 }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: it's fallback
        <Skeleton className="h-20 w-full" key={index} />
      ))}
    </div>
  );
}
