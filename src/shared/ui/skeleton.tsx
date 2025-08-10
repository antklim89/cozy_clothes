import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';


function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-gray-400', className)} {...props} />;
}

function SkeletonText({ className, number = 2, ...props }: HTMLAttributes<HTMLDivElement> & { number?: number }) {
  return (
    <>
      {Array.from({ length: number }, (_, i) => i).map(i => (
        <Skeleton className={cn('w-full h-4 mb-2', className)} key={i} {...props} />
      ))}
    </>
  );
}

export { Skeleton, SkeletonText };
