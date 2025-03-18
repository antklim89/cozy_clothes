import { About, fetchAbout } from '@/features/about';


async function Page() {
  const { type, result: about } = await fetchAbout();
  if (type === 'error') return null;

  return <About about={about} />;
}

export default Page;
