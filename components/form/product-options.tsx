'use client';
import { FormItem, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import type { ProductType } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ComponentProps } from 'react';

type Props = ComponentProps<'form'> & {
  options: ProductType['options'];
};

function ProductOptions({ options, className, ...props }: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleValueChange = (field: string) => (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(field, value);
    replace(`${pathname}?${newSearchParams}`);
  };

  return (
    <form {...props} className={cn('flex flex-col gap-4', className)}>
      <FormItem>
        <Label htmlFor="size">Size:</Label>
        <Select onValueChange={handleValueChange('size')} defaultValue={searchParams.get('size') ?? options.sizes[0]}>
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

      <FormItem>
        <Label htmlFor="color">Color:</Label>
        <Select
          onValueChange={handleValueChange('color')}
          defaultValue={searchParams.get('color') ?? options.colors[0]}
        >
          <SelectTrigger className="uppercase" id="color">
            <SelectValue placeholder="Select a color..." />
          </SelectTrigger>
          <SelectContent>
            {options.colors.map((color) => (
              <SelectItem className="uppercase" key={color} value={color}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItem>
    </form>
  );
}

export default ProductOptions;
