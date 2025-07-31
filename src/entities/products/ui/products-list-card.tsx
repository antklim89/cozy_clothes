import Image from 'next/image';
import Link from 'next/link';
import type { ProductType } from '@/src/entities/products/model';
import placeholder from '@/src/shared/assets/placeholder.png';
import { Card, CardContent, CardHeader } from '@/src/shared/ui/card';
import { Price } from '@/src/shared/ui/price';


interface Props {
  product: ProductType;
}

export function ProductsListCard({ product }: Props) {
  const image = product.images[0] ?? {
    url: placeholder.src,
    width: placeholder.width,
    height: placeholder.height,
    blurDataUrl: placeholder.blurDataURL ?? 'a',
  };

  return (
    <Card className="group relative">
      <div className="w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          alt={product.title}
          blurDataURL={image.blurDataUrl}
          className="h-72 w-full object-cover object-center lg:h-80 lg:w-full"
          height={image.height}
          placeholder="blur"
          src={image.url}
          width={image.width}
        />
      </div>
      <CardHeader>
        <Link href={`/products/${product.id}`}>
          <span aria-hidden="true" className="absolute inset-0" />
          {product.title}
        </Link>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div>
          <p className="mt-1 text-sm">{product.country.name}</p>
          <p className="mt-1 text-sm">{product.category.name}</p>
        </div>
        <Price discount={product.discount} price={product.price} />
      </CardContent>
    </Card>
  );
}

