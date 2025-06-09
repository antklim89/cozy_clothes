'use client';
import {
  Content,
  Group,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import type { ComponentPropsWithoutRef, ComponentRef, RefObject } from 'react';
import { cn } from '@/lib/utils';


const Select = Root;

const SelectGroup = Group;

const SelectValue = Value;

function SelectTrigger({
  ref,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Trigger> & { ref?: RefObject<ComponentRef<typeof Trigger>> }) {
  return (
    <Trigger
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      <Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Icon>
    </Trigger>
  );
}

function SelectScrollUpButton({ ref, className, ...props }: ComponentPropsWithoutRef<typeof ScrollUpButton> & { ref?: RefObject<ComponentRef<typeof ScrollUpButton>> }) {
  return (
    <ScrollUpButton
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      ref={ref}
      {...props}
    >
      <ChevronUp className="h-4 w-4" />
    </ScrollUpButton>
  );
}

function SelectScrollDownButton({ ref, className, ...props }: ComponentPropsWithoutRef<typeof ScrollDownButton> & { ref?: RefObject<ComponentRef<typeof ScrollDownButton>> }) {
  return (
    <ScrollDownButton
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      ref={ref}
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </ScrollDownButton>
  );
}

function SelectContent({
  ref,
  className,
  children,
  position = 'popper',
  ...props
}: ComponentPropsWithoutRef<typeof Content> & { ref?: RefObject<ComponentRef<typeof Content>> }) {
  return (
    <Portal>
      <Content
        className={cn(
          'relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper'
          && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        ref={ref}
        {...props}
      >
        <SelectScrollUpButton />
        <Viewport
          className={cn(
            'p-1',
            position === 'popper'
            && 'h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)',
          )}
        >
          {children}
        </Viewport>
        <SelectScrollDownButton />
      </Content>
    </Portal>
  );
}

function SelectLabel({ ref, className, ...props }: ComponentPropsWithoutRef<typeof Label> & { ref?: RefObject<ComponentRef<typeof Label>> }) {
  return <Label className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)} ref={ref} {...props} />;
}

function SelectItem({
  ref,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Item> & { ref?: RefObject<ComponentRef<typeof Item>> }) {
  return (
    <Item
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <Check className="h-4 w-4" />
        </ItemIndicator>
      </span>

      <ItemText>{children}</ItemText>
    </Item>
  );
}

function SelectSeparator({ ref, className, ...props }: ComponentPropsWithoutRef<typeof Separator> & { ref?: RefObject<ComponentRef<typeof Separator>> }) {
  return <Separator className={cn('-mx-1 my-1 h-px bg-muted', className)} ref={ref} {...props} />;
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
