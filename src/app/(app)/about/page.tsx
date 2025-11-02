import { getAbout } from '@/entities/about/services';
import { About } from '@/entities/about/ui';

async function Page() {
  const { type, result: about } = await getAbout();
  if (type === 'error') return <p>Error</p>;

  return <About about={about} />;
}

export default Page;
