import type { CollectionConfig, GlobalConfig } from 'payload';
import { MediaCollection } from '@/shared/model/media-collection';


export const About: GlobalConfig = {
  slug: 'About',
  fields: [
    {
      name: 'text',
      type: 'richText',
      required: true,
    },
  ],
};

export const AboutMedia: CollectionConfig = {
  ...MediaCollection,
  slug: 'about-media',
  upload: {
    ...MediaCollection.upload,
    staticDir: 'media/about',
  },
};


