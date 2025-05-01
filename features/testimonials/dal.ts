import '@/lib/server-only';
import { cache } from 'react';
import { getTestimonials } from '@/features/testimonials/services';
import type { TestimonialType } from '@/features/testimonials/types';
import type { PromiseResult } from '@/lib/result';


export const fetchTestimonials = cache(async (): PromiseResult<TestimonialType[]> => {
  const result = await getTestimonials();
  return result;
});
