'use client';

import { useId } from 'react';
import { parseAsArrayOf, parseAsInteger, useQueryStates } from 'nuqs';

import type { ProductCategoryType } from '@/entities/product-categories/model';
import { Field, FieldLabel } from '@/shared/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectMultipleValue, SelectTrigger } from '@/shared/ui/select';

const queryStateOptions = parseAsArrayOf(parseAsInteger).withDefault([]).withOptions({ shallow: false });

export function ProductCategoriesSelect({ categories }: { categories: ProductCategoryType[] }) {
  const id = useId();
  const [query, setQuery] = useQueryStates({
    categories: queryStateOptions,
    page: parseAsInteger,
  });

  const selectedCategories = categories.filter(i => query.categories.includes(i.id));

  return (
    <Field>
      <FieldLabel htmlFor={id}>Category</FieldLabel>
      <Select value={query.categories} onValueChange={async v => setQuery({ categories: v, page: null })} multiple>
        <SelectTrigger id={id} className="w-full">
          <SelectMultipleValue
            items={selectedCategories}
            render={i => <span key={i.id}>{i.name}</span>}
            placeholder="Select Category"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories
              .toSorted(a => (query.categories.includes(a.id) ? -1 : 1))
              .map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
