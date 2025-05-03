import '@/lib/server-only';
import { getPayload } from 'payload';
import type { TestimonialType } from '@/features/testimonials';
import { err, ok } from '@/lib/result';
import config from '@/payload.config';


export async function getTestimonials() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'testimonials',
      pagination: false,
      depth: 1,
    });

    return ok(result.docs as TestimonialType[]);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return err({ type: 'error', message: 'Failed to fetch testimonials' });
  }
}
