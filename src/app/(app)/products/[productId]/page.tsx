import { type ReactNode, Suspense } from 'react';
import { cacheLife, cacheTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod/v4-mini';

import { PRODUCT_CACHE_TAG } from '@/entities/products/config';
import { getFavoriteProduct, getProduct } from '@/entities/products/services';
import type { UserType } from '@/entities/user/model';
import { getMe } from '@/entities/user/services';
import { FavoritesToggleButton, FavoritesToggleButtonUnauthorized } from '@/features/favorites-toggle/ui';
import type { Result } from '@/shared/lib/result';
import { ErrorComponent } from '@/shared/ui/error-component';
import { Product, ProductFallback } from '@/widgets/product/ui';

async function ProductPageSection({
  productId,
  favoriteButtonSlot,
}: {
  productId: number;
  favoriteButtonSlot: ReactNode;
}) {
  'use cache';
  cacheLife('max');
  cacheTag(`${PRODUCT_CACHE_TAG}:${productId}`);

  const productResult = await getProduct(productId);
  if (productResult.type === 'error') return <ErrorComponent error={productResult.error} />;

  return <Product product={productResult.result} favoriteButtonSlot={favoriteButtonSlot} />;
}

async function FavoriteButtonPageSection({
  favoriteProductPromise,
  userPromise,
}: {
  userPromise: Promise<UserType | null>;
  favoriteProductPromise: Promise<
    Result<{ id: number; isFavorite: boolean }, 'unauthenticated' | 'unexpected' | 'not-found'>
  >;
}) {
  const user = await userPromise;

  const { result: product, type, error } = await favoriteProductPromise;
  if (type === 'error' && error.type === 'unauthenticated') return <FavoritesToggleButtonUnauthorized />;
  if (type === 'error') return <ErrorComponent error={error} />;

  return (
    <FavoritesToggleButton
      size="icon"
      isAuthenticated={user != null}
      productId={product.id}
      isFavorite={product.isFavorite}
    />
  );
}

async function Page({ params }: PageProps<'/products/[productId]'>) {
  const validatedParams = z.object({ productId: z.coerce.number() }).safeParse(await params);
  if (!validatedParams.success) return redirect('/products');

  const userPromise = getMe();
  const favoriteProductPromise = getFavoriteProduct(validatedParams.data.productId);

  return (
    <Suspense fallback={<ProductFallback />}>
      <ProductPageSection
        productId={validatedParams.data.productId}
        favoriteButtonSlot={
          <FavoriteButtonPageSection
            userPromise={userPromise}
            key={validatedParams.data.productId}
            favoriteProductPromise={favoriteProductPromise}
          />
        }
      />
    </Suspense>
  );
}

export default Page;

export { generateMetadata } from './seo';
