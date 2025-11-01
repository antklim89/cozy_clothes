'use client';
import { useSearchParams } from 'next/navigation';
import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';


export function ProductPagination({
  className,
  totalPages,
  page = 1,
  ...props
}: ComponentProps<'nav'> & {
  page?: number;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  if (totalPages <= 1) return null;
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  function getSearchParamsLink(newPage?: number) {
    const newSearchParams = new URLSearchParams(searchParams);
    if (newPage == null) newSearchParams.delete('page');
    else newSearchParams.set('page', newPage.toFixed(0));

    return `?${newSearchParams.toString()}`;
  }

  return (
    <Pagination className={className} {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={!hasPrev}
            className={cn({
              'text-gray-200 bg-transparent hover:text-gray-200 hover:bg-transparent cursor-default': !hasPrev,
            })}
            href={hasPrev ? getSearchParamsLink(Math.max(1, page - 1)) : ''}
            tabIndex={hasPrev ? 0 : -1}
          />
        </PaginationItem>

        {[page - 2, page - 1, page, page + 1, page + 2]
          .filter(i => i > 0 && i <= totalPages)
          .map(i => (
            <PaginationItem key={i}>
              <PaginationLink
                href={getSearchParamsLink(i)}
                isActive={i === page}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          ))}

        <PaginationItem>
          <PaginationNext
            aria-disabled={!hasNext}
            className={cn({
              'text-gray-200 bg-transparent hover:text-gray-200 hover:bg-transparent cursor-default': !hasNext,
            })}
            href={hasNext ? getSearchParamsLink(Math.min(totalPages, page + 1)) : ''}
            tabIndex={hasNext ? 0 : -1}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
