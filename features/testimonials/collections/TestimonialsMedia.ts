import type { CollectionConfig } from 'payload';
import { Media } from '@/collections/Media';


export const TestimonialsMedia: CollectionConfig = {
  ...Media,
  slug: 'testimonials-media',
  upload: {
    ...Media.upload,
    staticDir: 'media/testimonials',
    resizeOptions: {
      position: 'center',
      fit: 'cover',
      height: 120,
      width: 120,
    },
  },
};
