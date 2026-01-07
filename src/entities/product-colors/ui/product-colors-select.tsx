'use client';

import { useId } from 'react';
import { parseAsArrayOf, parseAsInteger, useQueryStates } from 'nuqs';

import { Field, FieldLabel } from '@/shared/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectMultipleValue, SelectTrigger } from '@/shared/ui/select';
import type { ProductColorType } from '../models/types';

const querySelectOptions = parseAsArrayOf(parseAsInteger).withDefault([]).withOptions({ shallow: false });

export function ProductColorsSelect({ colors }: { colors: ProductColorType[] }) {
  const id = useId();
  const [query, setQuery] = useQueryStates({
    colors: querySelectOptions,
    page: parseAsInteger,
  });

  const selectedColors = colors.filter(i => query.colors.includes(i.id));

  return (
    <Field>
      <FieldLabel htmlFor={id}>Colors</FieldLabel>
      <Select
        value={selectedColors.map(i => i.id)}
        onValueChange={async v => setQuery({ colors: v, page: null })}
        multiple
      >
        <SelectTrigger id={id} className="w-full">
          <SelectMultipleValue
            items={selectedColors}
            render={color => (
              <div key={color.id} className="flex items-center gap-1">
                <span className="inline-block size-4 rounded-full" style={{ backgroundColor: color.code }} />
                <span className="uppercase">{color.name}</span>
              </div>
            )}
            placeholder="Select Color"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {colors
              .toSorted(a => (query.colors.includes(a.id) ? -1 : 1))
              .map(color => (
                <SelectItem key={color.id} value={color.id}>
                  <div key={color.id} className="flex items-center gap-1">
                    <span className="inline-block size-4 rounded-full" style={{ backgroundColor: color.code }} />
                    <span className="uppercase">{color.name}</span>
                  </div>
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
