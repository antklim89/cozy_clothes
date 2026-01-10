import type { ComponentProps } from 'react';
import Link from 'next/link';

import type { ProductVariantType } from '@/entities/products/model';
import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '@/shared/ui/button';

interface Props extends ComponentProps<'div'> {
  variants: ProductVariantType[];
  selectedVariant: ProductVariantType;
}

export function ProductsVariantsSelect({ variants, selectedVariant: variant, className, ...props }: Props) {
  return (
    <div {...props} className={cn('flex flex-col gap-4', className)}>
      <ColorVariant selectedVariant={variant} variants={variants} />
      <SizeVariant selectedVariant={variant} variants={variants} />
    </div>
  );
}

function ColorVariant({ variants, selectedVariant }: Props) {
  const colors = Map.groupBy(variants, i => i.color.name);

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-lg">Colors:</h4>
      <div className="flex flex-wrap gap-1">
        {Array.from(colors, ([color, variant]) => {
          const newVariant =
            (selectedVariant.color.name === color ? selectedVariant : null) ??
            variants.find(i => i.size === selectedVariant.size && i.color.name === color) ??
            variants.find(i => i.color.name === color);

          if (newVariant == null) return null;
          return (
            <Link
              key={color}
              className={cn(buttonVariants({ variant: 'outline' }), 'text-md uppercase no-underline', {
                'border-2 border-primary dark:border-primary': newVariant.id === selectedVariant.id,
                'opacity-40': !variant.some(i => i.size === selectedVariant.size),
              })}
              href={`/products/${newVariant?.id}`}
              scroll={false}
            >
              <span className="mr-2 size-4 rounded-full" style={{ backgroundColor: variant?.[0]?.color.code }} />
              {color}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SizeVariant({ variants, selectedVariant }: Props) {
  const sizes = Map.groupBy(variants, i => i.size);

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-lg">Sizes:</h4>
      <div className="flex flex-wrap gap-1">
        {Array.from(sizes, ([size, variant]) => {
          const newVariant =
            (selectedVariant.size.id === size.id ? selectedVariant : null) ??
            variants.find(i => i.color.name === selectedVariant.color.name && i.size.id === size.id) ??
            variants.find(i => i.size.id === size.id);

          if (newVariant == null) return null;
          return (
            <Link
              key={size.id}
              className={cn(buttonVariants({ variant: 'outline' }), 'text-md uppercase no-underline', {
                'border-2 border-primary dark:border-primary': newVariant.id === selectedVariant.id,
                'opacity-40': !variant.some(i => i.color.name === selectedVariant.color.name),
              })}
              href={`/products/${newVariant?.id}`}
              scroll={false}
            >
              {size.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
