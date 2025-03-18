'use client';
import { useSearchParams } from 'next/navigation';
import type { ComponentProps } from 'react';
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadcnPagination,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';


export function ProductPagination({
  className,
  totalPages,
  page,
  ...props
}: ComponentProps<'nav'> & {
  page: number;
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
    <ShadcnPagination className={className} {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn({
              'text-gray-200 bg-transparent hover:text-gray-200 hover:bg-transparent cursor-default': !hasPrev,
            })}
            href={getSearchParamsLink(Math.max(1, page - 1))}
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
            className={cn({
              'text-gray-200 bg-transparent hover:text-gray-200 hover:bg-transparent cursor-default': !hasNext,
            })}
            href={getSearchParamsLink(Math.min(totalPages, page + 1))}
            tabIndex={hasNext ? 0 : -1}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
