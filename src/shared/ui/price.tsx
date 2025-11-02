import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { cn, getPrice } from '@/shared/lib/utils';

const priceVariants = cva('font-bold tracking-tight', {
  variants: {
    size: { md: 'text-xl', sm: 'text-lg', lg: 'text-3xl' },
  },
  defaultVariants: {
    size: 'md',
  },
});

const discountVariants = cva('font-sans  opacity-70 text-nowrap', {
  variants: {
    size: { md: 'text-sm', sm: 'text-xs', lg: 'text-lg' },
  },
  defaultVariants: {
    size: 'md',
  },
});

const priceWithoutDiscountVariants = cva('line-through font-sans  opacity-60 text-nowrap', {
  variants: {
    size: { md: 'text-sm', sm: 'text-xs', lg: 'text-lg' },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface Props extends VariantProps<typeof priceVariants>, ComponentProps<'p'> {
  price: number;
  discount?: number;
  qty?: number;
}

export function Price({ price, discount = 0, qty, size, className, ...props }: Props) {
  return (
    <p className={cn('flex flex-col gap-1', className)} {...props}>
      <span className={cn(priceVariants({ size }))}>{getPrice({ price, qty })}</span>

      {discount > 0 && (
        <>
          <span className={cn(discountVariants({ size }))}>- {discount} %</span>

          <span className={cn(priceWithoutDiscountVariants({ size }))}>{getPrice({ price, discount, qty })}</span>
        </>
      )}
    </p>
  );
}
