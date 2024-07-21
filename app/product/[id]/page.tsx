import { Product } from '@/components/feature';
import { productLoader } from '@/lib/contentLoaders';
import { notFound } from 'next/navigation';

async function ProductPage({ params }: { params: { id: string } }) {
  const product = await productLoader(params.id);
  if (!product) return notFound();

  return <Product product={product} />;
}

export default ProductPage;
