'use client';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

const queryStateOptions = parseAsString
  .withOptions({ shallow: false, limitUrlUpdates: { method: 'debounce', timeMs: 700 } })
  .withDefault('');

export function ProductSearch() {
  const [searchTerm, setSearchTerm] = useQueryStates({ search: queryStateOptions, page: parseAsInteger });

  return (
    <div>
      <Label>Search</Label>
      <Input value={searchTerm.search} onChange={async e => setSearchTerm({ search: e.target.value, page: null })} />
    </div>
  );
}
