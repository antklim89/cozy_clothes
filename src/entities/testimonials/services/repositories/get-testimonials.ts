import 'server-only';
import { getPayload } from '@/src/shared/lib/payload';
import { err, ok } from '@/src/shared/lib/result';
import type { TestimonialType } from '../../model/types';


export async function getTestimonialsRepository() {
  try {
    const payload = await getPayload();
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
