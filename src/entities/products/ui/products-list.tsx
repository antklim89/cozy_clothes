import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib/utils';


export function ProductsList({ children, className, ...props }: ComponentProps<'div'>) {
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


