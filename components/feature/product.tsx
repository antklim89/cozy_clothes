import type { ProductType } from '@/lib';

interface Props {
  product: ProductType;
}

function Product({ product }: Props) {
  return (
    <div>
      <section>SECTION</section>
      <aside>ASIDE</aside>
    </div>
  );
}

export default Product;
