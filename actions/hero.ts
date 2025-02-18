'use server';
import { getPayload } from 'payload';
import type { HeroType } from '@/lib/types';
import config from '@/payload.config';


export async function fetchHero(): Promise<HeroType> {
  const payload = await getPayload({ config });
  const result = await payload.findGlobal({
    slug: 'Hero',
    depth: 1,
  });

  return result as HeroType;
}
