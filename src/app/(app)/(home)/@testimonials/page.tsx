import { getTestimonials } from '@/src/entities/testimonials/services/dal';
import { Testimonials } from '@/src/entities/testimonials/ui';

async function Page() {
  const { type, result: testimonials } = await getTestimonials();
  if (type === 'error') return <p>Error</p>;

  return (
    <Testimonials testimonials={testimonials} />
  );
}

export default Page;
