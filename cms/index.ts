import process from 'node:process';
import type { CmsBackend, CmsConfig } from 'decap-cms-core';
import { about } from './about';
import { contacts } from './contacts';
import { hero } from './hero';
import { info } from './info';
import { products } from './products';
import { testimonials } from './testimonials';


const backend: CmsBackend
  = process.env.NETLIFY === 'true'
    ? {
        name: 'git-gateway',
        branch: 'main',
      }
    : {
        name: 'github',
        repo: process.env.REPOSITORY_URL ?? 'test/test',
        branch: 'main',
      };

const URL_HOSTNAME = new URL(process.env.URL ?? 'http://localhost:3000').hostname;

export const decapCmsConfig: CmsConfig = {
  load_config_file: false,
  backend,

  local_backend: {
    url: `http://${URL_HOSTNAME}:8081/api/v1`,
    allowed_hosts: [URL_HOSTNAME],
  },

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
