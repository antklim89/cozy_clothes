import type { Metadata } from 'next';

import { getSeo } from '@/entities/seo/services';
import { env } from '@/shared/lib/env';

export async function generateMetadata(): Promise<Metadata> {
  const { type, error, result: seo } = await getSeo();
  if (type === 'error') throw new Error(error.message);

  const { title, creator, description, images, keywords } = seo;

  return {
    metadataBase: env.URL,
    authors: [{ name: creator }],
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords,
    openGraph: {
      type: 'website',
      url: env.URL,
      title,
      description,
      images,
    },
    twitter: {
      title,
      description,
      creator,
      card: 'summary_large_image',
    },
  };
}
