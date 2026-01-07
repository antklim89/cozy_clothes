import { Field, FieldLabel } from '@/shared/ui/field';
import { Skeleton } from '@/shared/ui/skeleton';

export function ProductCategoriesSelectFallback() {
  return (
    <Field>
      <FieldLabel>Category</FieldLabel>
      <Skeleton className="h-8 w-full" />
    </Field>
  );
}
