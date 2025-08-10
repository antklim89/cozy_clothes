import type { Ref, TextareaHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';


export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

function Textarea({ ref, className, ...props }: TextareaProps & { ref?: Ref<HTMLTextAreaElement> }) {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

export { Textarea };
