import { Product } from '@/components/feature/product';
import { productLoader, productsLoader } from '@/lib/contentLoaders';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const product = await productLoader(params.id);
  if (!product) return notFound();

  return {
    title: product.title,
    keywords: [product.title, product.category],
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.map((image) => ({ url: image })),
    },
    twitter: {
      title: product.title,
      description: product.description,
      card: 'summary_large_image',
    },
  };
};

export const dynamicParams = false;
export const generateStaticParams = async () => {
  const products = await productsLoader();
  return products.filter((i) => i.hidden === false).map(({ id }) => ({ id }));
};

const ProductPage = async ({ params }: Props) => {
  const product = await productLoader(params.id);
  if (!product) return notFound();

  return <Product className="my-8" product={product} />;
};

export default ProductPage;
