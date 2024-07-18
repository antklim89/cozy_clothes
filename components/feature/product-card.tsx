import { Button, Card, CardFooter, CardHeader, CardTitle, Price } from '@/components/ui';
import type { ProductType } from '@/lib';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  product: ProductType;
}

function ProductCard({ product }: Props) {
  return (
    <Card className="prose prose-h3:my-2 flex flex-col">
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <Image
          className="w-full h-64 object-contain"
          src={product.imagePreview}
          width={480}
          height={200}
          alt={product.title}
        />
      </CardHeader>
      <CardFooter className="flex flex-col justify-end items-end">
        <Price price={product.price} discount={product.discount} />
        <Button asChild>
          <Link className="no-underline" href={`/product/${product.id}`}>
            Show
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
