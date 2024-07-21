import { Product } from '@/components/feature';
import { productLoader } from '@/lib/contentLoaders';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const product = await productLoader(params.id);

  return {
    title: product.title,
    keywords: [product.title, product.category],
    description: product.description,
  };
};

async function ProductPage({ params }: Props) {
  const product = await productLoader(params.id);
  if (!product) return notFound();

  return <Product className="my-8" product={product} />;
}

export default ProductPage;
