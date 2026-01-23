import { getAbout } from '@/entities/about/services';
import { About } from '@/entities/about/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

async function Page() {
  const { result: about, error } = await getAbout();
  if (error) return <ErrorComponent error={error} />;

  return <About about={about} />;
}

export default Page;
