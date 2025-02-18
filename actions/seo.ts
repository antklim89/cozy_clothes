'use server';
import { getPayload } from 'payload';
import type { SeoType } from '@/lib/types';
import config from '@/payload.config';


export async function fetchSeo(): Promise<SeoType> {
  const payload = await getPayload({ config });
  const result = await payload.findGlobal({
    slug: 'Seo',
  });

  return result;
}
