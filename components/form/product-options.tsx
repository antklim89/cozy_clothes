'use client';
import { FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { type ProductType, qtySchema } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ComponentProps } from 'react';

type Props = ComponentProps<'form'> & {
  options: ProductType['options'];
};

export const ProductOptions = ({ options, className, ...props }: Props) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleValueChange = (field: string, value: string | number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(field, value.toString());
    replace(`${pathname}?${newSearchParams}`, { scroll: false });
  };

  return (
    <form {...props} className={cn('flex flex-col gap-4', className)}>
      {options.sizes && (
        <FormItem>
          <Label htmlFor="size">Size:</Label>
          <ToggleGroup
            type="single"
            value={searchParams.get('size') ?? options.sizes[0]}
            onValueChange={(value) => handleValueChange('size', value)}
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
          <ToggleGroup
            type="single"
            value={searchParams.get('color') ?? options.colors[0]}
            onValueChange={(value) => handleValueChange('color', value)}
          >
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
          min={1}
          max={100}
          onChange={(e) => handleValueChange('qty', e.target.value)}
          onBlur={(e) => handleValueChange('qty', qtySchema.parse(e.target.valueAsNumber))}
          value={searchParams.get('qty') ?? '1'}
        />
      </FormItem>
    </form>
  );
};

export default ProductOptions;
