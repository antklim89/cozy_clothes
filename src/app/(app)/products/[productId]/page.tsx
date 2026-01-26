import { getOneProduct } from '@/entities/products/services';
import { getMe } from '@/entities/user/services';
import { FavoritesToggleButton } from '@/features/favorites-toggle/ui';
import { ErrorComponent } from '@/shared/ui/error-component';
import { Product } from '@/widgets/product/ui';
import { ParamsSchema } from './params';

async function Page({ params }: PageProps<'/products/[productId]'>) {
  const { productId } = await ParamsSchema.parseAsync(await params);

  const { result: product, error } = await getOneProduct(productId);
  const user = await getMe();
  if (error) return <ErrorComponent error={error} />;

  return (
    <Product
      product={product}
      favoriteButtonSlot={
        <FavoritesToggleButton
          size="icon-lg"
          isAuthenticated={user != null}
          productId={product.id}
          isFavorite={product.isFavorite}
        />
      }
    />
  );
}

export default Page;

export { generateMetadata } from './seo';
