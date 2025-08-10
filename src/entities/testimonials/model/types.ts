import type { Media } from '@/src/shared/model/types';


export interface TestimonialType {
  id: number;
  image: Media;
  text: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}
