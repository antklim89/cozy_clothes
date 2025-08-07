import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/src/shared/lib/utils';


interface Props extends ComponentProps<'section'> {
  totalSlot: ReactNode;
  checkoutSlot: ReactNode;
};

export function CartList({
  totalSlot,
  checkoutSlot,
  className,
  children,
  ...props
}: Props) {
  return (
    <section className={cn('container my-8', className)} {...props}>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-[3fr_1fr]">
        <div className="flex flex-col gap-4">
          {children}
        </div>
        <div className="flex flex-col gap-2">
          {totalSlot}
          {checkoutSlot}
        </div>
      </div>
    </section>
  );
}
