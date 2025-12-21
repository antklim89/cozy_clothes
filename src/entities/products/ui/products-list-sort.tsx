'use client';

import type { ComponentProps } from 'react';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

import { cn } from '@/shared/lib/utils';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

interface Option {
  value: string;
  label: string;
}

const sortOptions = [
  {
    value: 'createdAt',
    label: 'new',
  },
  {
    value: '-createdAt',
    label: 'old',
  },
  {
    value: 'price',
    label: 'cheaper',
  },
  {
    value: '-price',
    label: 'expensive',
  },
  {
    value: '-discount',
    label: 'big discounts',
  },
] as const satisfies Option[];

export function ProductsListSort(props: ComponentProps<typeof SelectTrigger>) {
  const [query, setQuery] = useQueryStates({
    sort: parseAsString.withOptions({ shallow: false }).withDefault(sortOptions[0].value),
    page: parseAsInteger,
  });
  const selectedOptions = sortOptions.find(i => i.value === query.sort) ?? sortOptions[0];

  return (
    <Select value={selectedOptions.value} onValueChange={v => setQuery({ sort: v, page: null })}>
      <SelectTrigger {...props} className={cn('w-48 uppercase', props.className)}>
        <SelectValue>{selectedOptions.label}</SelectValue>
      </SelectTrigger>
      <SelectContent className="z-50">
        <SelectGroup>
          {sortOptions.map(option => (
            <SelectItem className="uppercase" key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
