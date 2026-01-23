import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';
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
    return errUnexpected('Failed to fetch testimonials');
  }
}
