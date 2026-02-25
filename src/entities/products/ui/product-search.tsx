'use client';
import { XIcon } from 'lucide-react';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { z } from 'zod/v4-mini';

import { latinsCharsCheck } from '@/shared/model/schemas/checks';
import { Button } from '@/shared/ui/button';
import { ButtonGroup } from '@/shared/ui/button-group';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

const queryStateOptions = parseAsString
  .withOptions({ shallow: false, limitUrlUpdates: { method: 'debounce', timeMs: 700 } })
  .withDefault('');

const validateSearchSchema = z.string().check(latinsCharsCheck);

export function ProductSearch() {
  const [searchTerm, setSearchTerm] = useQueryStates({ search: queryStateOptions, page: parseAsInteger });
  const validatedSearch = validateSearchSchema.safeParse(searchTerm.search);

  return (
    <Field data-invalid={!validatedSearch.success}>
      <FieldLabel>Search</FieldLabel>
      <ButtonGroup>
        <Input
          aria-invalid={!validatedSearch.success}
          value={searchTerm.search}
          onChange={e => setSearchTerm({ search: e.target.value, page: null })}
        />
        <Button variant="outline" onClick={() => setSearchTerm({ search: '', page: null })}>
          <XIcon />
        </Button>
      </ButtonGroup>
      {!validatedSearch.success && <FieldError>Invalid search term</FieldError>}
    </Field>
  );
}
