import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

interface Props extends ComponentProps<'nav'> {
  page: number;
  totalPages: number;
  category: string;
}

export const ProductsPagination = ({ className, category, totalPages, page, ...props }: Props) => {
  if (totalPages <= 1) return null;
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  function shouldHide(pageItem: number, showPages: number) {
    return ((pageItem < page - showPages) && pageItem !== 1) || ((pageItem > page + showPages) && pageItem !== totalPages);
  }

  return (
    <Pagination className={className} {...props}>
      <PaginationContent>
        <PaginationItem >
          <PaginationPrevious
            tabIndex={hasPrev ? 0 : -1}
            className={cn({
              'text-gray-200 bg-transparent hover:text-gray-200 hover:bg-transparent cursor-default': !hasPrev,
            })}
            href={`/products/${category}/${Math.max(1, page - 1)}`}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
          <PaginationItem
            key={i}
            className={
              `${shouldHide(i, 1) ? 'hidden ' : 'block '}` +
              `${shouldHide(i, 2) ? 'sm:hidden ' : 'sm:block '}` +
              `${shouldHide(i, 4) ? 'md:hidden ' : 'md:block '}` +
              `${shouldHide(i, 10) ? 'lg:hidden ' : 'lg:block '}` +
              `${shouldHide(i, 14) ? 'xl:hidden ' : 'xl:block '}`
            }
          >
            <PaginationLink size="default" isActive={page === i} href={`/products/${category}/${i}`}>
              {i}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            tabIndex={hasNext ? 0 : -1}
            className={cn({
              'text-gray-200 bg-transparent hover:text-gray-200 hover:bg-transparent cursor-default': !hasNext,
            })}
            href={`/products/${category}/${Math.min(totalPages, page + 1)}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
