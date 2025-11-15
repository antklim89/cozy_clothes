'use client';

import type { SelectTriggerProps } from '@radix-ui/react-select';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

import { cn } from '@/shared/lib/utils';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

const sortOptions = [
  {
    key: 'createdAt',
    label: 'new',
  },
  {
    key: '-createdAt',
    label: 'old',
  },
  {
    key: 'price',
    label: 'cheaper',
  },
  {
    key: '-price',
    label: 'expensive',
  },
  {
    key: '-discount',
    label: 'big discounts',
  },
] as const;

export function ProductsListSort(props: SelectTriggerProps) {
  const [query, setQuery] = useQueryStates({
    sort: parseAsString.withOptions({ shallow: false }).withDefault(sortOptions[0].key),
    page: parseAsInteger,
  });

  return (
    <Select value={query.sort} onValueChange={v => setQuery({ sort: v, page: null })}>
      <SelectTrigger {...props} className={cn('w-48 uppercase', props.className)}>
        <SelectValue placeholder="Sort Products" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortOptions.map(option => (
            <SelectItem className="uppercase" key={option.key} value={option.key}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
