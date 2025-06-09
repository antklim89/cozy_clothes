import type { HTMLAttributes, RefObject } from 'react';
import { cn } from '@/lib/utils';


function Card({ ref, className, ...props }: HTMLAttributes<HTMLDivElement> & { ref?: RefObject<HTMLDivElement> }) {
  return <div className={cn('rounded-lg border bg-card text-card-foreground shadow-xs', className)} ref={ref} {...props} />;
}

function CardHeader({ ref, className, ...props }: HTMLAttributes<HTMLDivElement> & { ref?: RefObject<HTMLDivElement> }) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)} ref={ref} {...props} />;
}

function CardTitle({ ref, className, ...props }: HTMLAttributes<HTMLHeadingElement> & { ref?: RefObject<HTMLParagraphElement> }) {
  return <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} ref={ref} {...props} />;
}

function CardDescription({ ref, className, ...props }: HTMLAttributes<HTMLParagraphElement> & { ref?: RefObject<HTMLParagraphElement> }) {
  return <p className={cn('text-sm text-muted-foreground', className)} ref={ref} {...props} />;
}

function CardContent({ ref, className, ...props }: HTMLAttributes<HTMLDivElement> & { ref?: RefObject<HTMLDivElement> }) {
  return <div className={cn('p-6 pt-0', className)} ref={ref} {...props} />;
}

function CardFooter({ ref, className, ...props }: HTMLAttributes<HTMLDivElement> & { ref?: RefObject<HTMLDivElement> }) {
  return <div className={cn('flex items-center p-6 pt-0', className)} ref={ref} {...props} />;
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
