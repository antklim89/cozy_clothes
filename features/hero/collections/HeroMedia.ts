import type { CollectionConfig } from 'payload';
import { Media } from '@/collections/Media';


export const HeroMedia: CollectionConfig = {
  ...Media,
  slug: 'hero-media',
  upload: {
    ...Media.upload,
    staticDir: 'media/hero',
  },
};
