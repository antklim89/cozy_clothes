'use client';
import type { ComponentProps } from 'react';
import { FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useSearchParamsState } from '@/lib/hooks';
import type { ProductType } from '@/lib/schemas';
import { cn } from '@/lib/utils';


type Props = ComponentProps<'form'> & {
  options: ProductType['options'];
};

export function ProductOptions({ options, className, ...props }: Props) {
  const [size, setSize] = useSearchParamsState('size', options?.sizes?.[0]);
  const [color, setColor] = useSearchParamsState('color', options?.colors?.[0].name);

  return (
    <form {...props} className={cn('flex flex-col gap-4', className)}>
      {options.sizes && (
        <FormItem>
          <Label htmlFor="size">Size:</Label>
          <ToggleGroup
            type="single"
            value={size ?? ''}
            variant="outline"
            onValueChange={value => value.length > 0 && setSize(value)}
          >
            {options.sizes.map(sizeItem => (
              <ToggleGroupItem key={sizeItem} value={sizeItem}>
                {sizeItem}
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
            value={color ?? ''}
            variant="outline"
            onValueChange={value => value.length > 0 && setColor(value)}
          >
            {options.colors.map(({ code, name }) => (
              <ToggleGroupItem className="flex items-center relative overflow-hidden" key={name} value={name}>
                <div
                  className="absolute left-0 right-0 bottom-0 top-[calc(100%-10px)] opacity-80"
                  style={{ backgroundColor: code }}
                />
                {name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </FormItem>
      )}
    </form>
  );
}
