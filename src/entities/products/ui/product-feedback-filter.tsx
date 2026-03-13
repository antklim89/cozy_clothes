'use client';

import { XIcon } from 'lucide-react';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

import { Field, FieldLabel } from '@/shared/ui/field';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group';

const queryStateOptions = parseAsString
  .withOptions({
    shallow: false,
    limitUrlUpdates: { method: 'debounce', timeMs: 700 },
  })
  .withDefault('none');

const filters = ['5', '4.5', '4', '3.5', '3', 'none'] as const;

export function FeedbackFilter() {
  const [query, setQuery] = useQueryStates({
    averageFeedback: queryStateOptions,
    page: parseAsInteger,
  });

  return (
    <div className="">
      <Field>
        <FieldLabel>Average feedback rating</FieldLabel>
        <ToggleGroup
          variant="outline"
          value={[query.averageFeedback]}
          onValueChange={([value]) => setQuery({ averageFeedback: value, page: null })}
        >
          {filters.map(filter => (
            <ToggleGroupItem key={filter} value={filter || undefined}>
              {filter === 'none' ? <XIcon /> : filter}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Field>
    </div>
  );
}
