'use server';
import { cache } from 'react';
import { getTestimonials } from '@/features/testimonials/services';
import type { TestimonialType } from '@/features/testimonials/types';
import type { PromiseResult } from '@/lib/result';
import { err, success, UNEXPECTED_ERROR } from '@/lib/result';


export const fetchTestimonials = cache(async (): PromiseResult<TestimonialType[]> => {
  try {
    const result = await getTestimonials();
    return success(result);
  } catch {
    return err(UNEXPECTED_ERROR);
  }
});
