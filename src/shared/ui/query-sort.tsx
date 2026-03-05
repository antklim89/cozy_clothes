'use client';

import type { ComponentProps } from 'react';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

import { cn } from '@/shared/lib/utils';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

export interface Option {
  value: string;
  label: string;
}

export function QuerySort({
  options,
  key,
  ...props
}: {
  key?: string;
  options: [Option, ...Option[]];
} & ComponentProps<typeof SelectTrigger>) {
  const [query, setQuery] = useQueryStates({
    sort: parseAsString.withOptions({ shallow: false }).withDefault(options[0].value),
    page: parseAsInteger,
  });
  const selectedOptions = options.find(i => i.value === query.sort) ?? options[0];

  return (
    <Select value={selectedOptions.value} onValueChange={v => setQuery({ sort: v, page: null })}>
      <SelectTrigger {...props} className={cn('w-48 uppercase', props.className)}>
        <SelectValue>{selectedOptions.label}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map(option => (
            <SelectItem className="uppercase" key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
