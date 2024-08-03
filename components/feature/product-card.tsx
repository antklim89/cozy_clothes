import Price from '@/components/ui/price';
import type { ProductType } from '@/lib/schemas';
import Image from 'next/image';
import { InCartIcon } from './in-cart-icon';

interface Props {
  product: ProductType;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <section key={product.id} className="group relative">
      <InCartIcon productId={product.id} />
      <div className="w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          width={400}
          height={400}
          alt={product.title}
          src={product.imagePreview}
          className="h-72 w-full object-cover object-center lg:h-80 lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <Price price={product.price} discount={product.discount} />
      </div>
    </section>
  );
};

export default ProductCard;
