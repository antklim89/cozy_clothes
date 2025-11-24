import { cacheTag } from 'next/cache';

import { HERO_CACHE_TAG } from '@/entities/hero/config';
import { getHero } from '@/entities/hero/services';
import { Hero } from '@/entities/hero/ui';

async function Page() {
  'use cache';
  cacheTag(HERO_CACHE_TAG);

  const { type, result: hero } = await getHero();
  if (type === 'error') return <p>Error</p>;

  return <Hero hero={hero} />;
}

export default Page;
