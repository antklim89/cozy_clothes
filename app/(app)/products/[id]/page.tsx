import type { Metadata } from 'next';
import { fetchProduct, fetchProducts } from '@/actions/products';
import { Product } from '@/components/feature/product';


interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProduct(Number(id));

  return {
    title: product.title,
    keywords: [product.title, product.category.name],
    // description: product.description,
    openGraph: {
      title: product.title,
      // description: product.description,
      images: product.images.map(image => ({ url: image.url })),
    },
    twitter: {
      title: product.title,
      // description: product.description,
      card: 'summary_large_image',
    },
  };
}

export const dynamicParams = false;
export async function generateStaticParams() {
  const products = await fetchProducts({
    pagination: false,
  });
  const paths = products.docs.map(({ id }) => ({ id: id.toString() }));

  return paths;
}

async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await fetchProduct(Number(id));

  return <Product className="my-8" product={product} />;
}

export default ProductPage;
