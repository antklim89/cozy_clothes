import Image from 'next/image';
import Link from 'next/link';
import { Price } from '@/components/ui/price';
import placeholder from '@/public/placeholder.jpg';
import type { ProductType } from '../../types';


interface Props {
  product: ProductType;
}

export function ProductCard({ product }: Props) {
  const image = product.images[0] ?? {
    url: placeholder.src,
    width: placeholder.width,
    height: placeholder.height,
    blurDataUrl: placeholder.blurDataURL ?? 'a',
  };

  return (
    <section className="group relative" key={product.id}>
      <div className="w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
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
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/products/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.country.name}</p>
          <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
        </div>
        <Price discount={product.discount} price={product.price} />
      </div>
    </section>
  );
}

