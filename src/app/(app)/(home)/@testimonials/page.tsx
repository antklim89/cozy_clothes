import { getTestimonials } from '@/entities/testimonials/services/dal';
import { Testimonials } from '@/entities/testimonials/ui';

async function Page() {
  const { type, result: testimonials } = await getTestimonials();
  if (type === 'error') return <p>Error</p>;

  return (
    <Testimonials testimonials={testimonials} />
  );
}

export default Page;
