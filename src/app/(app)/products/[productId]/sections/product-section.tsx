import { getOneProduct } from '@/entities/products/services';
import { hasSession } from '@/entities/user/services';
import { FavoritesToggleButton } from '@/features/favorites-toggle/ui';
import { ErrorComponent } from '@/shared/ui/error-component';
import { Product } from '@/widgets/product/ui';

export async function ProductSection({ productId }: { productId: number }) {
  const { result: product, error } = await getOneProduct(productId);
  const isAuthenticated = await hasSession();
  if (error) return <ErrorComponent error={error} />;

  return (
    <Product
      product={product}
      favoriteButtonSlot={
        <FavoritesToggleButton
          size="icon-xl"
          isAuthenticated={isAuthenticated}
          productId={product.id}
          isFavorite={product.isFavorite}
        />
      }
    />
  );
}
