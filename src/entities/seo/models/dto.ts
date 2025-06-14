import type { Seo } from '@/payload-types';
import { SeoSchema } from './schemas';
import type { SeoType } from './types';


export function seoDto(data: Seo): SeoType {
  return SeoSchema.parse(data);
}
