import type { ComponentProps } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';


export function ProductsList({ children, ...props }: ComponentProps<'section'>) {
  return (
    <section {...props}>{children}</section>
  );
}


export function ProductsListContent({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'container my-4 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8',
        className,
      )}
    >
      {children}
    </div>
  );
}


export function ProductsListTitle({ children, className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      {...props}
      className={cn(
        'prose text-center text-2xl mt-4 font-bold',
        className,
      )}
    >
      {children}
    </h2>
  );
}


export function ProductsListPagination({
  className,
  searchParams,
  totalPages,
  page,
  ...props
}: ComponentProps<'nav'> & {
  page: number;
  totalPages: number;
  searchParams?: Record<string, string>;
}) {
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
    </Pagination>
  );
}
