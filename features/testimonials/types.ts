import type { Populated } from '@/lib/types';
import type { Testimonial } from '@/payload-types';


export type TestimonialType = Populated<Testimonial, 'image'>;
