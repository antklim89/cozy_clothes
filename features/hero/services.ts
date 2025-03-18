import { getPayload } from 'payload';
import type { HeroType } from '@/features/hero/types';
import config from '@/payload.config';


export async function getHero(): Promise<HeroType> {
  const payload = await getPayload({ config });
  const result = await payload.findGlobal({
    slug: 'Hero',
    depth: 1,
  });

  return result as HeroType;
}
