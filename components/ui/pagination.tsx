import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps, RefObject } from 'react';
import { buttonVariants } from '@/components/ui/button';
import type { ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';


function Pagination({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      role="navigation"
      {...props}
    />
  );
}

function PaginationContent({ ref, className, ...props }: ComponentProps<'ul'> & { ref?: RefObject<HTMLUListElement> }) {
  return <ul className={cn('flex flex-row items-center gap-1', className)} ref={ref} {...props} />;
}

function PaginationItem({ ref, className, ...props }: ComponentProps<'li'> & { ref?: RefObject<HTMLLIElement> }) {
  return <li className={cn('', className)} ref={ref} {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
ComponentProps<typeof Link>;

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn('gap-1 pl-2.5', className)}
      size="default"
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn('gap-1 pr-2.5', className)}
      size="default"
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span aria-hidden className={cn('flex h-9 w-9 items-center justify-center', className)} {...props}>
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
