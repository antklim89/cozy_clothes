import { Skeleton } from '@/shared/ui/skeleton';

export function ProductImagesCarouselFallback() {
  return <Skeleton className="h-160 w-full" />;
}

export function ProductInfoFallback() {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="h-12 w-180" />
      <Skeleton className="h-9 w-120" />
      <Skeleton className="h-6 w-80" />
      <div className="flex flex-col gap-2">
        {Array.from({ length: 15 }, (_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: fallback
          <Skeleton key={index} className="h-3 w-full" />
        ))}
      </div>
    </div>
  );
}

export function ProductPriceFallback() {
  return (
    <div className="flex flex-col items-end gap-8 self-end">
      <Skeleton className="h-10 w-80" />
      <Skeleton className="h-8 w-60" />
      <Skeleton className="h-6 w-50" />
    </div>
  );
}
