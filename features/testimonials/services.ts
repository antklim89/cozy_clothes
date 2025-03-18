import { getPayload } from 'payload';
import type { TestimonialType } from '@/features/testimonials/types';
import config from '@/payload.config';


export async function getTestimonials(): Promise<TestimonialType[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'testimonials',
    pagination: false,
    depth: 1,
  });

  return result.docs as TestimonialType[];
}
