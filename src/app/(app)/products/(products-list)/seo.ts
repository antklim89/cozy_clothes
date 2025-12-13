import type { Metadata } from 'next';

export async function generateMetadata({ searchParams }: PageProps<'/products'>): Promise<Metadata> {
  const { search } = await searchParams;

  return {
    title: typeof search === 'string' ? search : 'Catalog',
  };
}
