import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';

export function ProductsVariantsSelectFallback() {
  return (
    <div className="flex flex-col gap-4">
      {['Colors', 'Sizes'].map(title => (
        <div key={title} className="flex flex-col gap-2">
          <h4 className="text-lg">{title}:</h4>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 6 }, (_, index) => {
              return (
                <Skeleton
                  // biome-ignore lint/suspicious/noArrayIndexKey: fallback
                  key={index}
                  className={cn(buttonVariants({ variant: 'outline' }), 'w-38 text-md uppercase no-underline', {})}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
