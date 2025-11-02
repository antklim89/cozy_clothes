'use client';
import type { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes, RefObject } from 'react';
import type { DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Dialog, DialogContent } from '@/shared/ui/dialog';

function Command({
  ref,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive> & {
  ref?: RefObject<ComponentRef<typeof CommandPrimitive> | null>;
}) {
  return (
    <CommandPrimitive
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

function CommandDialog({ children, ...props }: DialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group]]:px-2 **:[[cmdk-input]]:h-12 **:[[cmdk-item]]:px-2 **:[[cmdk-item]]:py-3">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  ref,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
  ref?: RefObject<ComponentRef<typeof CommandPrimitive.Input> | null>;
}) {
  return (
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        className={cn(
          'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
}

function CommandList({
  ref,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.List> & {
  ref?: RefObject<ComponentRef<typeof CommandPrimitive.List> | null>;
}) {
  return (
    <CommandPrimitive.List
      className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
      ref={ref}
      {...props}
    />
  );
}

function CommandEmpty({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> & {
  ref?: RefObject<ComponentRef<typeof CommandPrimitive.Empty> | null>;
}) {
  return <CommandPrimitive.Empty className="py-6 text-center text-sm" ref={ref} {...props} />;
}

function CommandGroup({
  ref,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Group> & {
  ref?: RefObject<ComponentRef<typeof CommandPrimitive.Group> | null>;
}) {
  return (
    <CommandPrimitive.Group
      className={cn(
        'overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:text-xs',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

function CommandSeparator({
  ref,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> & {
  ref?: RefObject<ComponentRef<typeof CommandPrimitive.Separator> | null>;
}) {
  return <CommandPrimitive.Separator className={cn('-mx-1 h-px bg-border', className)} ref={ref} {...props} />;
}

function CommandItem({
  ref,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
  ref?: RefObject<ComponentRef<typeof CommandPrimitive.Item> | null>;
}) {
  return (
    <CommandPrimitive.Item
      className={cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

function CommandShortcut({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)} {...props} />;
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
