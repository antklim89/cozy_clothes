import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';

export function AddToCartButtonFallback() {
  return (
    <Skeleton className="w-full">
      <Button className="w-full" disabled>
        Add To Cart
      </Button>
    </Skeleton>
  );
}
