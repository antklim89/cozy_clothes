import { getTestimonials, testimonialsCache } from '@/entities/testimonials/services';
import { Testimonials } from '@/entities/testimonials/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

async function Page() {
  'use cache';
  testimonialsCache();

  const { result: testimonials, error } = await getTestimonials();
  if (error) return <ErrorComponent error={error} />;

  return <Testimonials testimonials={testimonials} />;
}

export default Page;
