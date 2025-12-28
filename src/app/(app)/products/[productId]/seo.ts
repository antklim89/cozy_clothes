import type { Metadata } from 'next';
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';
import { z } from 'zod/v4-mini';

import { getProduct } from '@/entities/products/services';
import { env } from '@/shared/lib/env';

export async function generateMetadata({ params }: PageProps<'/products/[productId]'>): Promise<Metadata> {
  const { success, data } = await z.object({ productId: z.coerce.number() }).safeParseAsync(await params);
  if (!success) return { title: 'Invalid url.', description: 'Invalid url' };

  const { type, result: product, error } = await getProduct(data.productId);
  if (type === 'error') return { title: error.type, description: error.message };

  const {
    title,
    images: [image],
    country,
    category,
    baseDescription,
    description,
  } = product;
  const descriptionText = description ? convertLexicalToPlaintext({ data: description }) : undefined;
  const baseDescriptionText = baseDescription ? convertLexicalToPlaintext({ data: baseDescription }) : undefined;

  const finalDescription = `${baseDescriptionText}\n${descriptionText}`;
  const finalImage = image == null ? undefined : { url: image.url, width: image.width, height: image.height };

  return {
    title,
    description: finalDescription,
    keywords: [title, country.name, category.name],
    openGraph: {
      type: 'website',
      url: env.URL,
      title,
      images: finalImage,
      description: finalDescription,
    },
    twitter: {
      title,
      description: finalDescription,
      images: finalImage,
      card: 'summary_large_image',
    },
  };
}
