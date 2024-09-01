import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { InCartIcon } from './in-cart-icon';
import type { ProductType } from '@/lib/schemas';
import { defaultBlurDataUrl } from '@/constants';
import { Price } from '@/components/ui/price';


interface Props {
  product: ProductType;
}

export function ProductCard({ product }: Props) {
  const imported = typeof window !== 'undefined' ? null : use(import('@/lib/createBlurDataURL'));
  const blurDataURL = imported ? use(imported.createBlurDataURL(product.imagePreview)) : defaultBlurDataUrl;

  return (
    <section className="group relative" key={product.id}>
      <InCartIcon productId={product.id} />
      <div className="w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          alt={product.title}
          blurDataURL={blurDataURL}
          className="h-72 w-full object-cover object-center lg:h-80 lg:w-full"
          height={400}
          placeholder="blur"
          src={product.imagePreview}
          width={400}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <Price discount={product.discount} price={product.price} />
      </div>
    </section>
  );
}
