import { cacheLife } from 'next/cache';

import { getHero } from '@/entities/hero/services';
import { Hero } from '@/entities/hero/ui';

async function Page() {
  'use cache';
  cacheLife('max');
  const { type, result: hero } = await getHero();
  if (type === 'error') return <p>Error</p>;

  return <Hero hero={hero} />;
}

export default Page;
