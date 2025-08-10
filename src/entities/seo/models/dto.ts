import type { Seo } from '@/shared/model/payload-types.generated';
import { SeoSchema } from './schemas';
import type { SeoType } from './types';


export function seoDto(data: Seo): SeoType {
  return SeoSchema.parse(data);
}
