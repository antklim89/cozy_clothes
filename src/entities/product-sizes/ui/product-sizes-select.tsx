'use client';

import { useId } from 'react';
import { parseAsArrayOf, parseAsInteger, useQueryStates } from 'nuqs';

import { Field, FieldLabel } from '@/shared/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectMultipleValue, SelectTrigger } from '@/shared/ui/select';
import type { ProductSizeType } from '../models/types';

const querySelectOptions = parseAsArrayOf(parseAsInteger).withDefault([]).withOptions({ shallow: false });

export function ProductSizeSelect({ sizes }: { sizes: ProductSizeType[] }) {
  const id = useId();
  const [query, setQuery] = useQueryStates({
    sizes: querySelectOptions,
    page: parseAsInteger,
  });

  const selectedSizes = sizes.filter(i => query.sizes.includes(i.id));

  return (
    <Field>
      <FieldLabel htmlFor={id}>Sizes</FieldLabel>
      <Select
        value={selectedSizes.map(i => i.id)}
        onValueChange={async v => setQuery({ sizes: v, page: null })}
        multiple
      >
        <SelectTrigger id={id} className="w-full">
          <SelectMultipleValue
            items={selectedSizes}
            render={size => <div key={size.id}>{size.name}</div>}
            placeholder="Select Size"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sizes
              .toSorted(a => (query.sizes.includes(a.id) ? -1 : 1))
              .map(size => (
                <SelectItem key={size.id} value={size.id}>
                  {size.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
