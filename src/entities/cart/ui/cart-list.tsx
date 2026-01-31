import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';
import { ItemGroup } from '@/shared/ui/item';

export function CartList({
  total,
  checkout,
  className,
  children,
  ...props
}: {
  total: ReactNode;
  checkout: ReactNode;
} & ComponentProps<'section'>) {
  return (
    <section className={cn('container my-8', className)} {...props}>
      <div className="flex flex-col gap-4 lg:flex-row">
        <ItemGroup>{children}</ItemGroup>
        <div className="flex flex-[0_1_640px] flex-col gap-2">
          {total}
          {checkout}
        </div>
      </div>
    </section>
  );
}
