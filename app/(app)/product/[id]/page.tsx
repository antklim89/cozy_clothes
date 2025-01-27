import type { Metadata } from 'next';
import { Product } from '@/components/feature/product';
import { productLoader, productsLoader } from '@/lib/content-loaders';


interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await productLoader((await params).id);

  return {
    title: product.title,
    keywords: [product.title, product.category],
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.map(image => ({ url: image })),
    },
    twitter: {
      title: product.title,
      description: product.description,
      card: 'summary_large_image',
    },
  };
}

export const dynamicParams = false;
export async function generateStaticParams() {
  const products = await productsLoader();
  return products.filter(i => i.hidden === false).map(({ id }) => ({ id }));
}

async function ProductPage({ params }: Props) {
  const product = await productLoader((await params).id);

  return <Product className="my-8" product={product} />;
}

export default ProductPage;
