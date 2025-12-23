import Image from 'next/image';
import Link from 'next/link';

import type { ProductPreviewType } from '@/entities/products/model';
import { getMe } from '@/entities/user/services';
import { FavoritesToggleButton } from '@/features/favorites-toggle/ui';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Price } from '@/shared/ui/price';

interface Props {
  product: ProductPreviewType;
}

export async function ProductsListCard({ product }: Props) {
  const title = product.title ? `${product.baseTitle} (${product.title})` : product.baseTitle;
  const user = await getMe();

  return (
    <Card className="group relative pt-0">
      <div className="w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80">
        <Image
          alt={product.baseTitle}
          blurDataURL={product.imagePreview.blurDataUrl}
          className="h-72 w-full object-cover object-center lg:h-80 lg:w-full"
          height={product.imagePreview.height}
          placeholder="blur"
          src={product.imagePreview.url}
          width={product.imagePreview.width}
        />
      </div>
      <CardHeader>{title}</CardHeader>
      <CardContent className="flex justify-between">
        <div>
          <p className="mt-1 text-sm">{product.country.name}</p>
          <p className="mt-1 text-sm">{product.category.name}</p>
        </div>
        <Price className="items-end" discount={product.discount} price={product.price} />
      </CardContent>
      <FavoritesToggleButton
        isAuthenticated={user != null}
        productId={product.id}
        isFavorite={product.isFavorite}
        className="absolute top-0.5 right-0.5 z-20"
      />
      <Link className="absolute inset-0" href={`/products/${product.id}`} title={title} aria-label={product.title} />
    </Card>
  );
}
