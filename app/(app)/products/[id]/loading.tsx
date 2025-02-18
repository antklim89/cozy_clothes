import { Skeleton } from '@/components/ui/skeleton';


function ProductLoading() {
  return (
    <div className="container grid grid-cols-[2fr_1fr] gap-4 my-8">
      <Skeleton className="h-[80dvh] rounded-sm" />
      <Skeleton className="h-[80dvh] rounded-sm" />
    </div>
  );
}

export default ProductLoading;
