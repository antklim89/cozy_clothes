'use client';

import { useId } from 'react';
import { XIcon } from 'lucide-react';
import { parseAsArrayOf, parseAsInteger, useQueryStates } from 'nuqs';

import { Button } from '@/shared/ui/button';
import { ButtonGroup } from '@/shared/ui/button-group';
import { Field, FieldLabel } from '@/shared/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectMultipleValue, SelectTrigger } from '@/shared/ui/select';
import type { ProductCountryType } from '../models/types';

const querySelectOptions = parseAsArrayOf(parseAsInteger).withDefault([]).withOptions({ shallow: false });

export function ProductCountriesSelect({ countries }: { countries: ProductCountryType[] }) {
  const id = useId();
  const [query, setQuery] = useQueryStates({
    countries: querySelectOptions,
    page: parseAsInteger,
  });

  const selectedCountries = countries.filter(i => query.countries.includes(i.id));

  return (
    <Field>
      <FieldLabel htmlFor={id}>Countries</FieldLabel>
      <Select
        value={selectedCountries.map(i => i.id)}
        onValueChange={async v => setQuery({ countries: v, page: null })}
        multiple
      >
        <ButtonGroup>
          <SelectTrigger id={id} className="w-full">
            <SelectMultipleValue
              items={selectedCountries}
              render={i => <span key={i.id}>{i.name}</span>}
              placeholder="Select Country"
            />
          </SelectTrigger>
          <Button variant="outline" className="h-auto" onClick={() => setQuery({ countries: [], page: null })}>
            <XIcon />
          </Button>
        </ButtonGroup>
        <SelectContent>
          <SelectGroup>
            {countries
              .toSorted(a => (query.countries.includes(a.id) ? -1 : 1))
              .map(country => (
                <SelectItem key={country.id} value={country.id}>
                  {country.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
