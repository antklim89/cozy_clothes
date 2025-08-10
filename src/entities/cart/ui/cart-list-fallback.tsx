import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib/utils';
import { Skeleton } from '@/shared/ui/skeleton';


export function CartListFallback({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section className={cn('container flex flex-col gap-4 my-8', className)} {...props}>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-[3fr_1fr]">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }, (_, i) => <Skeleton className="w-full h-52" key={i} />)}
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-36" />
          <Skeleton className="w-full h-36" />
        </div>
      </div>
    </section>
  );
}
