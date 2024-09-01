'use client';
import { Item, Root } from '@radix-ui/react-toggle-group';
import type { VariantProps } from 'class-variance-authority';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  createContext,
  forwardRef,
  useContext,
  useMemo,
} from 'react';
import { cn } from '@/lib/utils';
import { toggleVariants } from '@/components/ui/toggle';


const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({
  size: 'default',
  variant: 'default',
});

const ToggleGroup = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => {
  const values = useMemo(() => ({ variant, size }), [variant, size]);
  return (
    <Root className={cn('flex items-center justify-center gap-1 flex-wrap', className)} ref={ref} {...props}>
      <ToggleGroupContext.Provider value={values}>{children}</ToggleGroupContext.Provider>
    </Root>
  );
});

ToggleGroup.displayName = Root.displayName;

const ToggleGroupItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item> & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
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
});

ToggleGroupItem.displayName = Item.displayName;

export { ToggleGroup, ToggleGroupItem };
