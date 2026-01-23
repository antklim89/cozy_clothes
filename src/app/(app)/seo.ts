import type { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';

import { SEO_CACHE_TAG } from '@/entities/seo/config';
import { getSeo } from '@/entities/seo/services';
import { env } from '@/shared/lib/env';

export async function generateMetadata(): Promise<Metadata> {
  'use cache';
  cacheLife('max');
  cacheTag(SEO_CACHE_TAG);
  const { error, result: seo } = await getSeo();
  if (error) throw new Error(error.message);

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
