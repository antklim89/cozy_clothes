import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';
import { ItemGroup } from '@/shared/ui/item';

interface Props extends ComponentProps<'section'> {
  totalSlot: ReactNode;
  checkoutSlot: ReactNode;
}

export function CartList({ totalSlot, checkoutSlot, className, children, ...props }: Props) {
  return (
    <section className={cn('container my-8', className)} {...props}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[3fr_1fr]">
        <ItemGroup>{children}</ItemGroup>
        <div className="flex flex-col gap-2">
          {totalSlot}
          {checkoutSlot}
        </div>
      </div>
    </section>
  );
}
