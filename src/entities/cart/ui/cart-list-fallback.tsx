import type { ComponentProps } from 'react';

import { cn } from '@/shared/lib/utils';
import { Skeleton } from '@/shared/ui/skeleton';

export function CartListFallback({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section className={cn('container my-8 flex flex-col gap-4', className)} {...props}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[3fr_1fr]">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: it's fallback
            <Skeleton className="h-52 w-full" key={i} />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-36 w-full" />
        </div>
      </div>
    </section>
  );
}
