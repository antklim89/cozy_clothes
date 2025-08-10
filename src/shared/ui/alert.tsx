import type { HTMLAttributes, RefObject } from 'react';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';


const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Alert({
  ref,
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & { ref?: RefObject<HTMLDivElement | null> }) {
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      ref={ref}
      role="alert"
      {...props}
    />
  );
}

function AlertTitle({ ref, className, ...props }: HTMLAttributes<HTMLHeadingElement> & { ref?: RefObject<HTMLParagraphElement | null> }) {
  return (
    <h5
      className={cn('mb-1 text-lg font-medium leading-none tracking-tight', className)}
      ref={ref}
      {...props}
    />
  );
}

function AlertDescription({ ref, className, ...props }: HTMLAttributes<HTMLParagraphElement> & { ref?: RefObject<HTMLParagraphElement | null> }) {
  return (
    <div
      className={cn('text-sm [&_p]:leading-relaxed', className)}
      ref={ref}
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };
