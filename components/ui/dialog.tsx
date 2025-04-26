'use client';
import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  HTMLAttributes,
  RefObject,
} from 'react';
import { cn } from '@/lib/utils';


const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogClose = Close;

function DialogOverlay({ ref, className, ...props }: ComponentPropsWithoutRef<typeof Overlay> & { ref?: RefObject<ComponentRef<typeof Overlay> | null> }) {
  return (
    <Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

function DialogContent({
  ref,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Content> & { ref?: RefObject<ComponentRef<typeof Content> | null> }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <Content
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
        <Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Close>
      </Content>
    </DialogPortal>
  );
}

function DialogHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5 text-center sm:text-left',
        className,
      )}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({ ref, className, ...props }: ComponentPropsWithoutRef<typeof Title> & { ref?: RefObject<ComponentRef<typeof Title> | null> }) {
  return (
    <Title
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

function DialogDescription({ ref, className, ...props }: ComponentPropsWithoutRef<typeof Description> & { ref?: RefObject<ComponentRef<typeof Description> | null> }) {
  return (
    <Description
      className={cn('text-sm text-muted-foreground', className)}
      ref={ref}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
