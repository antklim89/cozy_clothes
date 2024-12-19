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
  category,
  totalPages,
  page,
  ...props
}: ComponentProps<'nav'> & {
  page: number;
  totalPages: number;
  category: string;
}) {
  if (totalPages <= 1) return null;
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  function shouldHide(pageItem: number, showPages: number) {
    return ((pageItem < page - showPages) && pageItem !== 1) || ((pageItem > page + showPages) && pageItem !== totalPages);
  }

  return (
    <Pagination className={className} {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn({
              'text-gray-200 bg-transparent hover:text-gray-200 hover:bg-transparent cursor-default': !hasPrev,
            })}
            href={`/products/${category}/${Math.max(1, page - 1).toPrecision()}`}
            tabIndex={hasPrev ? 0 : -1}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(i => (
          <PaginationItem
            className={
              `${shouldHide(i, 1) ? 'hidden ' : 'block '}`
              + `${shouldHide(i, 2) ? 'sm:hidden ' : 'sm:block '}`
              + `${shouldHide(i, 4) ? 'md:hidden ' : 'md:block '}`
              + `${shouldHide(i, 10) ? 'lg:hidden ' : 'lg:block '}`
              + `${shouldHide(i, 14) ? 'xl:hidden ' : 'xl:block '}`
            }
            key={i}
          >
            <PaginationLink href={`/products/${category}/${i.toPrecision()}`} isActive={page === i} size="default">
              {i}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className={cn({
              'text-gray-200 bg-transparent hover:text-gray-200 hover:bg-transparent cursor-default': !hasNext,
            })}
            href={`/products/${category}/${Math.min(totalPages, page + 1).toPrecision()}`}
            tabIndex={hasNext ? 0 : -1}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
