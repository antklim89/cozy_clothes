import { cacheTag } from 'next/cache';

import { HERO_CACHE_TAG } from '@/entities/hero/config';
import { getHero } from '@/entities/hero/services';
import { Hero } from '@/entities/hero/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

async function Page() {
  'use cache';
  cacheTag(HERO_CACHE_TAG);

  const { type, result: hero, error } = await getHero();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <Hero hero={hero} />;
}

export default Page;
