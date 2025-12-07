import { cacheTag } from 'next/cache';

import { TESTIMONIALS_CACHE_TAG } from '@/entities/testimonials/config';
import { getTestimonials } from '@/entities/testimonials/services';
import { Testimonials } from '@/entities/testimonials/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

async function Page() {
  'use cache';
  cacheTag(TESTIMONIALS_CACHE_TAG);

  const { type, result: testimonials, error } = await getTestimonials();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <Testimonials testimonials={testimonials} />;
}

export default Page;
