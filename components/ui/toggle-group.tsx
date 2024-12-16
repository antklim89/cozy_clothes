'use client';
import type { VariantProps } from 'class-variance-authority';
import { toggleVariants } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import { Item, Root } from '@radix-ui/react-toggle-group';
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  createContext,
  type RefObject,
  useContext,
  useMemo,
} from 'react';


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
    <Root className={cn('flex items-center justify-center gap-1 flex-wrap', className)} ref={ref} {...props}>
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
  const context = useContext(ToggleGroupContext);

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
