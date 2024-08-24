import type { CmsBackend, CmsConfig } from 'decap-cms-core';
import { about } from './about';
import { contacts } from './contacts';
import { hero } from './hero';
import { info } from './info';
import { products } from './products';
import { testimonials } from './testimonials';

const backend: CmsBackend =
  process.env.NETLIFY === 'true'
    ? {
        name: 'git-gateway',
        branch: 'main',
      }
    : {
        name: 'github',
        repo: process.env.REPOSITORY_URL,
        branch: 'main',
      };

export const decapCmsConfig: CmsConfig = {
  load_config_file: false,
  backend,
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
      files: [hero, about, info],
    },
  ],
};
