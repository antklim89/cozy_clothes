import { Skeleton } from '@/shared/ui/skeleton';

export function ProductFallback() {
  return (
    <div className="container my-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Skeleton className="h-[640px] w-full" />
      <div className="flex w-full flex-col gap-12">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />

        <Skeleton className="h-8 w-64 self-end" />
        <Skeleton className="h-8 w-48 self-end" />
        <Skeleton className="h-8 w-18 self-end" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </div>
  );
}
