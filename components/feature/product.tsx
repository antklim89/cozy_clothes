import { ProductOptions } from '@/components/form';
import { Button, Price } from '@/components/ui';
import Carousel from '@/components/ui/carousel';
import type { ProductType } from '@/lib';
import Image from 'next/image';

interface Props {
  product: ProductType;
}

function Product({ product }: Props) {
  return (
    <div className="container flex flex-col md:flex-row">
      <section className="border px-4 flex-[2_1_0]">
        <Carousel key={product.id} autoplay={false} scrollDistance="slide" showArrows swiping keyboard>
          {product.images.map((image) => (
            <Image
              key={image}
              src={image}
              width={480}
              height={320}
              alt={product.title}
              className="object-cover w-fit h-[28rem] md:h-[48rem]"
            />
          ))}
        </Carousel>
      </section>
      <aside className="border prose px-4 flex-[1_1_0] flex flex-col">
        <h2>{product.title}</h2>
        <h3>{product.category}</h3>
        <p>{product.description}</p>
        <ProductOptions options={product.options} />
        <Price price={product.price} discount={product.discount} />
        <Button>Add to cart</Button>
      </aside>
    </div>
  );
}

export default Product;
