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
  const groupedColors = Map.groupBy(variants, i => i.color.id);

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-lg">Colors:</h4>
      <div className="flex flex-wrap gap-1">
        {Array.from(groupedColors, ([colorId, groupedVariants]) => {
          const variant =
            (selectedVariant.color.id === colorId ? selectedVariant : null) ??
            variants.find(i => i.size.id === selectedVariant.size.id && i.color.id === colorId) ??
            variants.find(i => i.color.id === colorId);

          if (variant == null) return null;
          return (
            <Link
              key={colorId}
              className={cn(buttonVariants({ variant: 'outline' }), 'text-md uppercase no-underline', {
                'border-2 border-primary dark:border-primary': variant.id === selectedVariant.id,
                'opacity-40': !groupedVariants.some(i => i.size.id === selectedVariant.size.id),
              })}
              href={`/products/${variant.id}`}
              scroll={false}
            >
              <span className="mr-2 size-4 rounded-full" style={{ backgroundColor: variant.color.code }} />
              {variant.color.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SizeVariant({ variants, selectedVariant }: Props) {
  const groupedSizes = Map.groupBy(variants, i => i.size.id);

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-lg">Sizes:</h4>
      <div className="flex flex-wrap gap-1">
        {Array.from(groupedSizes, ([sizeId, groupedVariants]) => {
          const variant =
            (selectedVariant.size.id === sizeId ? selectedVariant : null) ??
            variants.find(i => i.color.id === selectedVariant.color.id && i.size.id === sizeId) ??
            variants.find(i => i.size.id === sizeId);

          if (variant == null) return null;
          return (
            <Link
              key={sizeId}
              className={cn(buttonVariants({ variant: 'outline' }), 'text-md uppercase no-underline', {
                'border-2 border-primary dark:border-primary': variant.id === selectedVariant.id,
                'opacity-40': !groupedVariants.some(i => i.color.id === selectedVariant.color.id),
              })}
              href={`/products/${variant.id}`}
              scroll={false}
            >
              {variant.size.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
