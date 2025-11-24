import { cacheTag } from 'next/cache';

import { TESTIMONIALS_CACHE_TAG } from '@/entities/testimonials/config';
import { getTestimonials } from '@/entities/testimonials/services';
import { Testimonials } from '@/entities/testimonials/ui';

async function Page() {
  'use cache';
  cacheTag(TESTIMONIALS_CACHE_TAG);

  const { type, result: testimonials } = await getTestimonials();
  if (type === 'error') return <p>Error</p>;

  return <Testimonials testimonials={testimonials} />;
}

export default Page;
