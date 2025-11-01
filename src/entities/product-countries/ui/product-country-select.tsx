'use client';

import { useId } from 'react';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs';
import { Label } from '@/shared/ui/label';
import { MultiSelect } from '@/shared/ui/multiselect';
import type { ProductCountryType } from '../models/types';


const querySelectOptions = parseAsArrayOf(parseAsString).withDefault([]).withOptions({ shallow: false });

export function ProductCountrySelect({ countries }: { countries: ProductCountryType[] }) {
  const id = useId();
  const [selectedCountries, setSelectedCountries] = useQueryStates({
    countries: querySelectOptions,
    page: parseAsInteger,
  });
  const options = countries.map(i => ({ label: i.name, value: i.id.toString() }));
  const selectedOptions = options.filter(i => selectedCountries.countries.includes(i.value));

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>Countries</Label>
      <MultiSelect
        id={id}
        options={options}
        selectedOptions={selectedOptions}
        onSelectOptions={async v => setSelectedCountries({ countries: v.map(i => i.value), page: null })}
      />
    </div>
  );
}
