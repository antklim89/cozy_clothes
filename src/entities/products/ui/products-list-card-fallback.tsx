import { Skeleton } from '@/src/shared/ui/skeleton';


export function ProductsListCardFallback() {
  return (
    <section className="group relative">
      <div className="w-full overflow-hidden lg:aspect-none lg:h-80">
        <Skeleton className="h-72 w-full lg:h-80 lg:w-full" />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-1 h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-20" />
      </div>
    </section>
  );
}
