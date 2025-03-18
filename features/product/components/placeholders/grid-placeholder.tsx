import { CardPlaceholder } from '@/features/product/components/placeholders/card-placeholder';
import { Grid } from '@/features/product/components/ui/grid';
import { PRODUCTS_PER_PAGE } from '@/features/product/constants';


export function GridPlaceholder() {
  return (
    <Grid>
      {Array.from({ length: PRODUCTS_PER_PAGE }, (_, i) => (
        <CardPlaceholder key={i} />
      ))}
    </Grid>
  );
}
