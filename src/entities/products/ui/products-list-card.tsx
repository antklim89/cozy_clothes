import Image from 'next/image';
import Link from 'next/link';
import type { ProductPreviewType } from '@/entities/products/model';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Price } from '@/shared/ui/price';


interface Props {
  product: ProductPreviewType;
}


export function ProductsListCard({ product }: Props) {
  const title = product.title ? `${product.baseTitle} (${product.title})` : product.baseTitle;

  return (
    <Card className="group relative">
      <div className="w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
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
      <CardHeader>
        <Link className="w-full" href={`/products/${product.id}`} title={title}>
          <span aria-hidden="true" className="absolute inset-0" />
          {title}
        </Link>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div>
          <p className="mt-1 text-sm">{product.country.name}</p>
          <p className="mt-1 text-sm">{product.category.name}</p>
        </div>
        <Price className="items-end" discount={product.discount} price={product.price} />
      </CardContent>
    </Card>
  );
}

