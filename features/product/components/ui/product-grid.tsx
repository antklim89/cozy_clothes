import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';


export function ProductGrid({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'my-8 grid gap-6 grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))]',
        className,
      )}
    >
      {children}
    </div>
  );
}


