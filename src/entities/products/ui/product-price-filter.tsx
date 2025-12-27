'use client';

import { parseAsInteger, useQueryStates } from 'nuqs';
import { z } from 'zod/v4-mini';

import { Field, FieldGroup, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

const queryStateOptions = parseAsInteger.withOptions({
  shallow: false,
  limitUrlUpdates: { method: 'debounce', timeMs: 700 },
});

export function PriceFilter() {
  const [price, setPrice] = useQueryStates({
    minPrice: queryStateOptions.withDefault(0),
    maxPrice: queryStateOptions.withDefault(0),
    page: parseAsInteger,
  });

  return (
    <div className="flex flex-col gap-4">
      <FieldGroup className="flex flex-row gap-2">
        <Field className="flex-1">
          <FieldLabel>Min Price</FieldLabel>
          <Input
            max={price.maxPrice}
            min={0}
            type="text"
            inputMode="numeric"
            value={price.minPrice}
            onChange={async e =>
              setPrice({ minPrice: z.catch(z.coerce.number(), 0).parse(e.target.value), page: null })
            }
          />
        </Field>
        <Field className="flex-1">
          <FieldLabel>Max Price</FieldLabel>
          <Input
            min={price.minPrice}
            type="text"
            inputMode="numeric"
            value={price.maxPrice}
            onChange={async e =>
              setPrice({ maxPrice: z.catch(z.coerce.number(), 0).parse(e.target.value), page: null })
            }
          />
        </Field>
      </FieldGroup>
    </div>
  );
}
