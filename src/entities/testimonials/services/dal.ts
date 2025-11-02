import 'server-only';
import { cache } from 'react';

import type { PromiseResult } from '@/shared/lib/result';
import { getTestimonialsRepository } from './repositories/get-testimonials';
import type { TestimonialType } from '../model/types';

export const getTestimonials = cache(async (): PromiseResult<TestimonialType[]> => {
  const result = await getTestimonialsRepository();
  return result;
});
