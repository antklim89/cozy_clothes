'use client';
import { Root } from '@radix-ui/react-separator';
import type { ComponentPropsWithoutRef, ComponentRef } from 'react';
import { cn } from '@/src/shared/lib/utils';


function Separator({
  ref,
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: ComponentPropsWithoutRef<typeof Root> & { ref?: React.RefObject<ComponentRef<typeof Root> | null> }) {
  return (
    <Root
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      decorative={decorative}
      orientation={orientation}
      ref={ref}
      {...props}
    />
  );
}

export { Separator };
