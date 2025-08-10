import { getHero } from '@/entities/hero/services/dal';
import { Hero } from '@/entities/hero/ui';

async function Page() {
  const { type, result: hero } = await getHero();
  if (type === 'error') return <p>Error</p>;

  return (
    <Hero hero={hero} />
  );
}

export default Page;
