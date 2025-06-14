'use client';
import { Root } from '@radix-ui/react-toggle';
import type { ComponentPropsWithoutRef, ComponentRef, RefObject } from 'react';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/src/shared/lib/utils';


const toggleVariants = cva(
  'inline-flex items-center justify-center cursor-pointer rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Toggle({
  ref,
  className,
  variant,
  size,
  ...props
}: ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof toggleVariants> & { ref?: RefObject<ComponentRef<typeof Root>> }) {
  return <Root className={cn(toggleVariants({ variant, size, className }))} ref={ref} {...props} />;
}


// eslint-disable-next-line react-refresh/only-export-components
export { Toggle, toggleVariants };
