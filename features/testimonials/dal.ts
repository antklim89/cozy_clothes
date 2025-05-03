import '@/lib/server-only';
import { cache } from 'react';
import type { PromiseResult } from '@/lib/result';
import { getTestimonials } from './services';
import type { TestimonialType } from './types';


export const fetchTestimonials = cache(async (): PromiseResult<TestimonialType[]> => {
  const result = await getTestimonials();
  return result;
});
