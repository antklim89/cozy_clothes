'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useId } from 'react';
import type { ComponentProps } from 'react';
import { FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { ProductType } from '@/features/product/types';
import { cn } from '@/lib/utils';


type Props = ComponentProps<'form'> & {
  variants: ProductType['variants'];
};

export function ProductVariants({ variants, className, ...props }: Props) {
  const searchParams = useSearchParams();

  const selectedVariantId = Number(searchParams.get('v'));
  const selectedVariant = variants.find(i => i.id === selectedVariantId) ?? variants[0];

  if (selectedVariant == null) return null;

  return (
    <form {...props} className={cn('flex flex-col gap-4', className)}>
      <ColorVariant selectedVariant={selectedVariant} variants={variants} />
      <SizeVariant selectedVariant={selectedVariant} variants={variants} />
    </form>
  );
}


function ColorVariant({
  variants,
  selectedVariant,
}: {
  variants: Props['variants'];
  selectedVariant: Props['variants'][number];
}) {
  const router = useRouter();
  const id = useId();

  const colors = Object.groupBy(variants, i => i.colorCode);

  const handleValueChange = (value: string): void => {
    const newVariant = (selectedVariant.colorCode === value ? selectedVariant : null)
      ?? variants.find(i => i.size === selectedVariant.size && i.colorCode === value)
      ?? variants.find(i => i.colorCode === value);

    if (newVariant == null) return;

    router.replace(`?v=${newVariant.id}`, { scroll: false });
  };

  return (
    <FormItem>
      <Label htmlFor={id}>Color:</Label>
      <ToggleGroup
        id={id}
        type="single"
        value={selectedVariant.colorCode}
        variant="outline"
        onValueChange={handleValueChange}
      >
        {Object.entries(colors).map(([color, variant = []]) => (
          <ToggleGroupItem
            className={cn('uppercase text-lg', { 'text-gray-300': variant.findIndex(i => i.size === selectedVariant.size) < 0 })}
            key={color}
            value={color}
          >
            <span className="rounded-full size-6 mr-2" style={{ backgroundColor: color }}></span>
            {variant[0]?.colorName ?? color}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </FormItem>
  );
}

function SizeVariant({
  variants,
  selectedVariant,
}: {
  variants: Props['variants'];
  selectedVariant: Props['variants'][number];
}) {
  const router = useRouter();

  const sizes = Object.groupBy(variants, i => i.size);

  return (
    <FormItem>
      <Label htmlFor="size">Size:</Label>
      <ToggleGroup
        type="single"
        value={selectedVariant.size}
        variant="outline"
        onValueChange={(value) => {
          const newVariant = (selectedVariant.size === value ? selectedVariant : null)
            ?? variants.find(i => i.colorCode === selectedVariant.colorCode && i.size === value)
            ?? variants.find(i => i.size === value);

          if (newVariant == null || newVariant.id == null) return;

          router.replace(`?v=${newVariant.id}`, { scroll: false });
        }}
      >
        {Object.entries(sizes).map(([size, variant]) => (
          <ToggleGroupItem
            className={cn('uppercase text-2xl', { 'text-gray-300': variant.findIndex(i => i.colorCode === selectedVariant.colorCode) < 0 })}
            key={size}
            value={size}
          >
            {size}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </FormItem>
  );
}
