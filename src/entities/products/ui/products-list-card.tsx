import Image from 'next/image';
import Link from 'next/link';

import type { ProductPreviewType } from '@/entities/products/model';
import { hasSession } from '@/entities/user/services';
import { FavoritesToggleButton } from '@/features/favorites-toggle/ui';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Price } from '@/shared/ui/price';

interface Props {
  product: ProductPreviewType;
}

export async function ProductsListCard({ product }: Props) {
  const isAuthenticated = await hasSession();

  return (
    <Card className="group relative pt-0">
      <Link
        href={`/products/${product.id}`}
        className="w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80"
      >
        <Image
          alt={product.baseTitle}
          blurDataURL={product.imagePreview.blurDataUrl}
          className="h-72 w-full object-cover object-center lg:h-80 lg:w-full"
          height={product.imagePreview.height}
          placeholder="blur"
          src={product.imagePreview.url}
          width={product.imagePreview.width}
        />
      </Link>

      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="leading-tight hover:underline">
          <Link href={`/products/${product.id}`}>
            <span className="font-bold text-xl">{product.baseTitle}</span>
            <br />
            <span className="font-sm opacity-70">{product.title}</span>
          </Link>
        </CardTitle>
        <FavoritesToggleButton
          isAuthenticated={isAuthenticated}
          productId={product.id}
          isFavorite={product.isFavorite}
        />
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="mt-1 text-sm">
          <Link className="underline" href={`/products?categories=${product.category.id}`}>
            {product.category.name}
          </Link>{' '}
          from{' '}
          <Link className="underline" href={`/products?countries=${product.country.id}`}>
            {product.country.name}
          </Link>
        </p>

        <div className="flex gap-6">
          <Badge
            render={<Link href={`/products?sizes=${product.size.id}`} />}
            variant="outline"
            className="w-24 p-4 text-md uppercase"
          >
            {product.size.name}
          </Badge>
          <Badge
            render={<Link href={`/products?colors=${product.color.id}`} />}
            variant="outline"
            className="min-w-24 p-4 text-md uppercase"
          >
            <span className="size-4 rounded-full" style={{ backgroundColor: product.color.code }} />
            {product.color.name}
          </Badge>
        </div>
        <Price className="items-end" discount={product.discount} price={product.price} />
      </CardContent>
    </Card>
  );
}
