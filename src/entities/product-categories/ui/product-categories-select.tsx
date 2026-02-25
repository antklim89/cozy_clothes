'use client';

import { useId } from 'react';
import { XIcon } from 'lucide-react';
import { parseAsArrayOf, parseAsInteger, useQueryStates } from 'nuqs';

import type { ProductCategoryType } from '@/entities/product-categories/model';
import { Button } from '@/shared/ui/button';
import { ButtonGroup } from '@/shared/ui/button-group';
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
        <ButtonGroup>
          <SelectTrigger id={id} className="w-full">
            <SelectMultipleValue
              items={selectedCategories}
              render={i => <span key={i.id}>{i.name}</span>}
              placeholder="Select Category"
            />
          </SelectTrigger>
          <Button variant="outline" className="h-auto" onClick={() => setQuery({ categories: [], page: null })}>
            <XIcon />
          </Button>
        </ButtonGroup>

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
