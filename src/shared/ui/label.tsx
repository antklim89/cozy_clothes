'use client';
import type { ComponentPropsWithoutRef, ComponentRef, RefObject } from 'react';
import { Root } from '@radix-ui/react-label';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');

function Label({
  ref,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Root> &
  VariantProps<typeof labelVariants> & { ref?: RefObject<ComponentRef<typeof Root>> }) {
  return <Root className={cn(labelVariants(), className)} ref={ref} {...props} />;
}

export { Label };
