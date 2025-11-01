'use client';

import * as React from 'react';
import { useId } from 'react';
import {
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs';
import type { ProductCategoryType } from '@/entities/product-categories/model';
import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';


const DEFAULT_OPTION = 'Select category';
const queryStateOptions = parseAsString.withDefault(DEFAULT_OPTION).withOptions({ shallow: false });

export function CategoryFilter({ categories }: { categories: ProductCategoryType[] }) {
  const [selectedCategory, setSelectedCategory] = useQueryStates({
    category: queryStateOptions,
    page: parseAsInteger,
  });
  const id = useId();

  return (
    <div>
      <Label htmlFor={id}>Category</Label>
      <Select value={selectedCategory.category} onValueChange={async v => setSelectedCategory({ category: v, page: null })}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Product category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={DEFAULT_OPTION}>{DEFAULT_OPTION}</SelectItem>
          <SelectGroup>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
