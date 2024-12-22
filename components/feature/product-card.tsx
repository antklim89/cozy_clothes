import Link from 'next/link';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import { Price } from '@/components/ui/price';
import type { ProductType } from '@/lib/schemas';
import { InCartIcon } from './in-cart-icon';


interface Props {
  product: ProductType;
}

export function ProductCard({ product }: Props) {
  return (
    <section className="group relative" key={product.id}>
      <InCartIcon productId={product.id} />
      <div className="w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <PlaceholderImage
          alt={product.title}
          className="h-72 w-full object-cover object-center lg:h-80 lg:w-full"
          height={400}
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
