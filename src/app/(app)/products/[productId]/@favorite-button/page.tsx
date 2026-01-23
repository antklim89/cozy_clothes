import { getIsFavoriteProduct } from '@/entities/products/services';
import { getMe } from '@/entities/user/services';
import { FavoritesToggleButton, FavoritesToggleButtonUnauthorized } from '@/features/favorites-toggle/ui';
import { ErrType } from '@/shared/lib/result';
import { ErrorComponent } from '@/shared/ui/error-component';
import { ParamsSchema } from '../params';

async function Page({ params }: PageProps<'/products/[productId]'>) {
  const { productId } = await ParamsSchema.parseAsync(await params);

  const user = await getMe();
  const favoriteProduct = await getIsFavoriteProduct(productId);

  if (favoriteProduct.error && favoriteProduct.error.type === ErrType.UNAUTHENTICATED) {
    return <FavoritesToggleButtonUnauthorized size="icon-lg" />;
  }
  if (favoriteProduct.error) return <ErrorComponent error={favoriteProduct.error} />;

  return (
    <FavoritesToggleButton
      size="icon-lg"
      isAuthenticated={user != null}
      productId={favoriteProduct.result.id}
      isFavorite={favoriteProduct.result.isFavorite}
    />
  );
}

export default Page;
