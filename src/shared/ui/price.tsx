import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { cn, getPrice } from '@/src/shared/lib/utils';


const priceVariants = cva(
  'font-bold tracking-tight',
  {
    variants: {
      size: { md: 'text-xl', sm: 'text-lg', lg: 'text-3xl' },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const discountVariants = cva(
  'font-sans  opacity-70 text-nowrap',
  {
    variants: {
      size: { md: 'text-sm', sm: 'text-xs', lg: 'text-lg' },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const priceWithoutDiscountVariants = cva(
  'line-through font-sans  opacity-60 text-nowrap',
  {
    variants: {
      size: { md: 'text-sm', sm: 'text-xs', lg: 'text-lg' },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

interface Props extends VariantProps<typeof priceVariants> {
  price: number;
  discount?: number;
  qty?: number;
}

export function Price({
  price,
  discount = 0,
  qty,
  size,
}: Props) {
  return (
    <p className="flex flex-col items-end gap-1">
      <span className={cn(priceVariants({ size }))}>
        {getPrice({ price, qty })}
      </span>

      {discount > 0 && (
        <>
          <span className={cn(discountVariants({ size }))}>
            - {discount} %
          </span>

          <span className={cn(priceWithoutDiscountVariants({ size }))}>
            {getPrice({ price, discount, qty })}
          </span>
        </>
      )}
    </p>
  );
}
