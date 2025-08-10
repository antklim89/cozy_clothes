import type { Media } from '@/shared/model/types';


export interface TestimonialType {
  id: number;
  image: Media;
  text: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}
