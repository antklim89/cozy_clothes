'use client';
import { toggleVariants } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import { Item, Root } from '@radix-ui/react-toggle-group';
import type { VariantProps } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, type ElementRef, createContext, forwardRef, useContext } from 'react';

const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({
  size: 'default',
  variant: 'default',
});

const ToggleGroup = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <Root ref={ref} className={cn('flex items-center justify-center gap-1 flex-wrap', className)} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </Root>
));

ToggleGroup.displayName = Root.displayName;

const ToggleGroupItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item> & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = useContext(ToggleGroupContext);

  return (
    <Item
      ref={ref}
      className={cn(
        'data-[state=on]:border-primary ',
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </Item>
  );
});

ToggleGroupItem.displayName = Item.displayName;

export { ToggleGroup, ToggleGroupItem };
