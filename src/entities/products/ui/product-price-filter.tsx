'use client';

import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { z } from 'zod/v4-mini';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

const queryStateOptions = parseAsString.withOptions({
  shallow: false,
  limitUrlUpdates: { method: 'debounce', timeMs: 700 },
});
const validatePriceSchema = z.coerce.number().check(z.minimum(0));

export function PriceFilter() {
  const [price, setPrice] = useQueryStates({
    minPrice: queryStateOptions.withDefault(''),
    maxPrice: queryStateOptions.withDefault(''),
    page: parseAsInteger,
  });
  const validatedMaxPrice = validatePriceSchema.safeParse(price.maxPrice);
  const validatedMinPrice = validatePriceSchema.safeParse(price.minPrice);

  return (
    <div className="flex flex-col gap-4">
      <FieldGroup className="flex flex-row gap-2">
        <Field data-invalid={!validatedMinPrice.success} className="flex-1">
          <FieldLabel>Min Price</FieldLabel>
          <Input
            aria-invalid={!validatedMinPrice.success}
            max={price.maxPrice}
            min={0}
            type="text"
            inputMode="numeric"
            value={price.minPrice}
            onChange={async e => setPrice({ minPrice: e.target.value, page: null })}
          />
          {!validatedMinPrice.success && <FieldError>Invalid minimum price</FieldError>}
        </Field>
        <Field data-invalid={!validatedMaxPrice.success} className="flex-1">
          <FieldLabel>Max Price</FieldLabel>
          <Input
            aria-invalid={!validatedMaxPrice.success}
            min={price.minPrice}
            type="text"
            inputMode="numeric"
            value={price.maxPrice}
            onChange={async e => setPrice({ maxPrice: e.target.value, page: null })}
          />
          {!validatedMaxPrice.success && <FieldError>Invalid maximum price</FieldError>}
        </Field>
      </FieldGroup>
    </div>
  );
}
