import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
}

function SkeletonText({ className, number = 2, ...props }: HTMLAttributes<HTMLDivElement> & { number?: number }) {
  return (
    <>
      {Array.from({ length: number }, (_, i) => i).map((i) => (
        <Skeleton key={i} className={cn('w-full h-4 mb-2', className)} {...props} />
      ))}
    </>
  );
}

export { Skeleton, SkeletonText };
