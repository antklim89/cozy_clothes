'use client';
import { Item, Root } from '@radix-ui/react-toggle-group';
import {
  createContext,
  use,
  useMemo,
} from 'react';
import type { ComponentPropsWithoutRef, ComponentRef, RefObject } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { toggleVariants } from '@/shared/ui/toggle';
import { cn } from '@/shared/lib/utils';


const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({
  size: 'default',
  variant: 'default',
});

function ToggleGroup({
  ref,
  className,
  variant,
  size,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof toggleVariants> & { ref?: RefObject<ComponentRef<typeof Root>> }) {
  const values = useMemo(() => ({ variant, size }), [variant, size]);
  return (
    <Root className={cn('flex gap-1 flex-wrap', className)} ref={ref} {...props}>
      <ToggleGroupContext value={values}>{children}</ToggleGroupContext>
    </Root>
  );
}

function ToggleGroupItem({
  ref,
  className,
  children,
  variant,
  size,
  ...props
}: ComponentPropsWithoutRef<typeof Item> & VariantProps<typeof toggleVariants> & { ref?: RefObject<ComponentRef<typeof Item>> }) {
  const context = use(ToggleGroupContext);

  return (
    <Item
      className={cn(
        'data-[state=on]:border-primary ',
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
