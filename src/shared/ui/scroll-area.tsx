'use client';

import {
  Corner,
  Root,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  Viewport,
} from '@radix-ui/react-scroll-area';
import type { ComponentPropsWithoutRef, ComponentRef, RefObject } from 'react';
import { cn } from '@/src/shared/lib/utils';


function ScrollArea({
  ref,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Root> & { ref?: React.RefObject<ComponentRef<typeof Root> | null> }) {
  return (
    <Root
      className={cn('relative overflow-hidden', className)}
      ref={ref}
      {...props}
    >
      <Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </Viewport>
      <ScrollBar />
      <Corner />
    </Root>
  );
}

function ScrollBar({
  ref,
  className,
  orientation = 'vertical',
  ...props
}: ComponentPropsWithoutRef<typeof ScrollAreaScrollbar> & { ref?: RefObject<ComponentRef<typeof ScrollAreaScrollbar> | null> }) {
  return (
    <ScrollAreaScrollbar
      className={cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical'
        && 'h-full w-2.5 border-l border-l-transparent p-px',
        orientation === 'horizontal'
        && 'h-2.5 flex-col border-t border-t-transparent p-px',
        className,
      )}
      orientation={orientation}
      ref={ref}
      {...props}
    >
      <ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
