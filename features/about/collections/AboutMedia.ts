import type { CollectionConfig } from 'payload';
import { Media } from '@/collections/Media';


export const AboutMedia: CollectionConfig = {
  ...Media,
  slug: 'about-media',
  upload: {
    ...Media.upload,
    staticDir: 'media/about',
  },
};
