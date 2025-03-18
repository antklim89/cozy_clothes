'use server';
import { getPayload } from 'payload';
import type { SeoType } from '@/features/seo/types';
import config from '@/payload.config';


export async function getSeo(): Promise<SeoType> {
  const payload = await getPayload({ config });
  const result = await payload.findGlobal({
    slug: 'Seo',
  });

  return result;
}
