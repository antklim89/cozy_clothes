'use client';
import {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  HTMLAttributes,
  RefObject,
} from 'react';
import { cn } from '@/src/shared/lib/utils';


const DropdownMenu = Root;

const DropdownMenuTrigger = Trigger;

const DropdownMenuGroup = Group;

const DropdownMenuPortal = Portal;

const DropdownMenuSub = Sub;

const DropdownMenuRadioGroup = RadioGroup;

function DropdownMenuSubTrigger({
  ref,
  className,
  inset,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof SubTrigger> & {
  inset?: boolean;
} & { ref?: RefObject<ComponentRef<typeof SubTrigger>> }) {
  return (
    <SubTrigger
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent data-[state=open]:bg-accent',
        inset && 'pl-8',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </SubTrigger>
  );
}

function DropdownMenuSubContent({ ref, className, ...props }: ComponentPropsWithoutRef<typeof SubContent> & { ref?: RefObject<ComponentRef<typeof SubContent>> }) {
  return (
    <SubContent
      className={cn(
        'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

function DropdownMenuContent({
  ref,
  className,
  sideOffset = 4,
  ...props
}: ComponentPropsWithoutRef<typeof Content> & { ref?: RefObject<ComponentRef<typeof Content>> }) {
  return (
    <Portal>
      <Content
        className={cn(
          'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </Portal>
  );
}

function DropdownMenuItem({
  ref,
  className,
  inset,
  ...props
}: ComponentPropsWithoutRef<typeof Item> & {
  inset?: boolean;
} & { ref?: RefObject<ComponentRef<typeof Item>> }) {
  return (
    <Item
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        inset && 'pl-8',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  ref,
  className,
  children,
  checked,
  ...props
}: ComponentPropsWithoutRef<typeof CheckboxItem> & { ref?: RefObject<ComponentRef<typeof CheckboxItem>> }) {
  return (
    <CheckboxItem
      checked={checked}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
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
      {children}
    </CheckboxItem>
  );
}

function DropdownMenuRadioItem({
  ref,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof RadioItem> & { ref?: RefObject<ComponentRef<typeof RadioItem>> }) {
  return (
    <RadioItem
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </ItemIndicator>
      </span>
      {children}
    </RadioItem>
  );
}

function DropdownMenuLabel({
  ref,
  className,
  inset,
  ...props
}: ComponentPropsWithoutRef<typeof Label> & {
  inset?: boolean;
} & { ref?: RefObject<ComponentRef<typeof Label>> }) {
  return <Label className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)} ref={ref} {...props} />;
}

function DropdownMenuSeparator({ ref, className, ...props }: ComponentPropsWithoutRef<typeof Separator> & { ref?: RefObject<ComponentRef<typeof Separator>> }) {
  return <Separator className={cn('-mx-1 my-1 h-px bg-muted', className)} ref={ref} {...props} />;
}

function DropdownMenuShortcut({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />;
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
