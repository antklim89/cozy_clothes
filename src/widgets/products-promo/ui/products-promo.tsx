import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

export function ProductsPromo({
  children,
  title,
  className,
  ...props
}: ComponentProps<'section'> & {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className={cn('container my-8', className)} {...props}>
      <h2 className="mb-4 font-bold text-4xl">{title}</h2>
      {children}
    </section>
  );
}
