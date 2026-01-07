import { Field, FieldLabel } from '@/shared/ui/field';
import { Skeleton } from '@/shared/ui/skeleton';

export function ProductSizesSelectFallback() {
  return (
    <Field>
      <FieldLabel>Sizes</FieldLabel>
      <Skeleton className="h-8 w-full" />
    </Field>
  );
}
