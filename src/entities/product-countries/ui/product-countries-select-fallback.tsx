import { Field, FieldLabel } from '@/shared/ui/field';
import { Skeleton } from '@/shared/ui/skeleton';

export function ProductCountriesSelectFallback() {
  return (
    <Field>
      <FieldLabel>Country</FieldLabel>
      <Skeleton className="h-8 w-full" />
    </Field>
  );
}
