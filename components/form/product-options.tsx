'use client';
import { FormItem, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
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
    replace(`${pathname}?${newSearchParams}`);
  };

  const handleQtyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const qty = Math.max(MIN_QTY, Math.min(MAX_QTY, e.target.valueAsNumber));
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('qty', Number.isNaN(qty) ? '1' : qty.toString());
    replace(`${pathname}?${newSearchParams}`);
  };

  return (
    <form {...props} className={cn('flex flex-col gap-4', className)}>
      {options.sizes && (
        <FormItem>
          <Label htmlFor="size">Size:</Label>
          <Select onValueChange={handleValueChange('size')} value={searchParams.get('size') ?? options.sizes[0]}>
            <SelectTrigger className="uppercase" id="size">
              <SelectValue placeholder="Select a size..." />
            </SelectTrigger>
            <SelectContent>
              {options.sizes.map((size) => (
                <SelectItem className="uppercase" key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}

      {options.colors && (
        <FormItem>
          <Label htmlFor="color">Color:</Label>
          <Select onValueChange={handleValueChange('color')} value={searchParams.get('color') ?? options.colors[0]}>
            <SelectTrigger className="uppercase" id="color">
              <SelectValue placeholder="Select a color..." />
            </SelectTrigger>
            <SelectContent>
              {options.colors.map((color) => (
                <SelectItem className="uppercase" key={color} value={color}>
                  <span style={{ backgroundColor: color }}>&emsp;&emsp;</span>&emsp;{color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
