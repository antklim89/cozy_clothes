import type { CmsConfig } from 'decap-cms-core';
import { contacts } from './contacts';
import { hero } from './hero';
import { products } from './products';
import { testimonials } from './testimonials';

export const decapCmsConfig: CmsConfig = {
  load_config_file: false,
  backend: {
    name: 'github',
    repo: 'antklim89/cozy_clothes',
    branch: 'main',
  },
  local_backend: true,
  media_folder: '/public/images',
  public_folder: '/images',
  editor: {
    preview: false,
  },
  collections: [
    products,
    contacts,
    testimonials,
    {
      name: 'site',
      label: 'Site',
      files: [hero],
    },
  ],
};
