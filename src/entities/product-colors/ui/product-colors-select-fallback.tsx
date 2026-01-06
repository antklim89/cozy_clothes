import { Field, FieldLabel } from '@/shared/ui/field';
import { Skeleton } from '@/shared/ui/skeleton';

export function ProductColorSelectFallback() {
  return (
    <Field>
      <FieldLabel>Color</FieldLabel>
      <Skeleton className="h-8 w-full" />
    </Field>
  );
}
