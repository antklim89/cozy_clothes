import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { z } from 'zod';
import { AddToCartButton, CartQtyInput } from '@/features/cart';
import {
  fetchAllProductIds,
  fetchProduct,
  Product,
} from '@/features/product';


interface Props {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ v: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { success, data: productId } = await z.coerce.number().safeParseAsync((await params).productId);
  if (!success) return {};

  const { type, result: product } = await fetchProduct(productId);
  if (type === 'error') return {};

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


export async function generateStaticParams() {
  const { type, result: ids } = await fetchAllProductIds();
  if (type === 'error') return [];

  const paths = ids.map(id => ({ productId: id.toString() }));

  return paths;
}


async function Page({ params, searchParams }: Props) {
  const { success, data: productId } = await z.coerce.number().safeParseAsync((await params).productId);
  if (!success) notFound();

  const { data: variantId } = await z.coerce.number().safeParseAsync((await searchParams).v);

  const { type, result: product } = await fetchProduct(productId);
  if (type === 'error') notFound();

  const variant = product.variants.find(i => i.id === variantId) ?? product.variants[0];
  if (variant == null) notFound();

  return (
    <Product
      addToCartButton={<AddToCartButton product={product} variant={variant} />}
      product={product}
      qtyInput={<CartQtyInput productId={product.id} variantId={variant.id} />}
    />
  );
}

export default Page;

export const dynamicParams = false;
