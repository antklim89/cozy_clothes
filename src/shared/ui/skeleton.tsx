import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-gray-400', className)} {...props} />;
}

function SkeletonText({ className, number = 2, ...props }: HTMLAttributes<HTMLDivElement> & { number?: number }) {
  return (
    <>
      {Array.from({ length: number }, (_, i) => i).map(i => (
        <Skeleton className={cn('mb-2 h-4 w-full', className)} key={i} {...props} />
      ))}
    </>
  );
}

export { Skeleton, SkeletonText };
