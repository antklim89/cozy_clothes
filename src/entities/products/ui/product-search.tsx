'use client';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

import { Field, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

const queryStateOptions = parseAsString
  .withOptions({ shallow: false, limitUrlUpdates: { method: 'debounce', timeMs: 700 } })
  .withDefault('');

export function ProductSearch() {
  const [searchTerm, setSearchTerm] = useQueryStates({ search: queryStateOptions, page: parseAsInteger });

  return (
    <Field>
      <FieldLabel>Search</FieldLabel>
      <Input value={searchTerm.search} onChange={async e => setSearchTerm({ search: e.target.value, page: null })} />
    </Field>
  );
}
