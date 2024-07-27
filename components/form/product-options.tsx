'use client';
import { FormItem, Input, Label, ToggleGroup, ToggleGroupItem } from '@/components/ui';
import type { ProductType } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ChangeEvent, ComponentProps } from 'react';

type Props = ComponentProps<'form'> & {
  options: ProductType['options'];
};

const MAX_QTY = 100;
const MIN_QTY = 1;

function ProductOptions({ options, className, ...props }: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleValueChange = (field: string) => (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(field, value);
    replace(`${pathname}?${newSearchParams}`, { scroll: false });
  };

  const handleQtyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const qty = Math.max(MIN_QTY, Math.min(MAX_QTY, e.target.valueAsNumber));
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('qty', Number.isNaN(qty) ? '1' : qty.toString());
    replace(`${pathname}?${newSearchParams}`, { scroll: false });
  };

  const selectedColor = searchParams.get('color') ?? options.colors?.[0];
  return (
    <form {...props} className={cn('flex flex-col gap-4', className)}>
      {options.sizes && (
        <FormItem>
          <Label htmlFor="size">Size:</Label>
          <ToggleGroup
            type="single"
            value={searchParams.get('size') ?? options.sizes[0]}
            onValueChange={handleValueChange('size')}
          >
            {options.sizes.map((size) => (
              <ToggleGroupItem key={size} value={size}>
                {size}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </FormItem>
      )}

      {options.colors && (
        <FormItem>
          <Label htmlFor="color">Color:</Label>
          <ToggleGroup type="single" value={selectedColor} onValueChange={handleValueChange('color')}>
            {options.colors.map((color) => (
              <ToggleGroupItem key={color} value={color} className="flex items-center relative overflow-hidden">
                <div
                  className="absolute left-0 right-0 bottom-0 top-[calc(100%-10px)] opacity-80"
                  style={{ backgroundColor: color }}
                />
                {color}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </FormItem>
      )}

      <FormItem>
        <Label htmlFor="color">Quantity:</Label>
        <Input
          type="number"
          min={MIN_QTY}
          max={MAX_QTY}
          onChange={handleQtyChange}
          value={searchParams.get('qty') ?? '1'}
        />
      </FormItem>
    </form>
  );
}

export default ProductOptions;
