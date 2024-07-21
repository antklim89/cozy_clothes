import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { type ProductType, cn } from '@/lib';
import type { ComponentProps } from 'react';

type Props = ComponentProps<'form'> & {
  options: ProductType['options'];
};

function ProductOptions({ options, className, ...props }: Props) {
  return (
    <form {...props} className={cn('flex flex-col gap-4', className)}>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Sizes" />
        </SelectTrigger>
        <SelectContent>
          {options.sizes.map((size) => (
            <SelectItem key={size} value={size}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Colors" />
        </SelectTrigger>
        <SelectContent>
          {options.colors.map((color) => (
            <SelectItem key={color} value={color}>
              {color}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  );
}

export default ProductOptions;
