import { getHero } from '@/entities/hero/services';
// biome-ignore lint/style/noRestrictedImports: hello
import { heroCache } from '@/entities/hero/services/cache';
import { Hero } from '@/entities/hero/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

async function Page() {
  'use cache';
  heroCache();

  const { result: hero, error } = await getHero();
  if (error) return <ErrorComponent error={error} />;

  return <Hero hero={hero} />;
}

export default Page;
