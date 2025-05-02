'use client';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import type { ProductCountryType } from '../types';


export function CountrySelect({ countries }: { countries: ProductCountryType[] }) {
  const [searchInput, setSearchInput] = useQueryState('countries', parseAsArrayOf(parseAsString).withDefault([]).withOptions({ shallow: false }));

  return (
    <Label className="flex flex-col gap-2">
      <span>Countries</span>
      <MultiSelect
        options={countries.map(i => ({
          label: i.name,
          value: i.id.toString(),
        }))}
        selectedValues={searchInput}
        onSelectedValuesChange={async value => setSearchInput(value)}
      />
    </Label>
  );
}
