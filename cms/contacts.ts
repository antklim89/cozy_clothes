import type { CmsCollection } from 'decap-cms-core';

export const contacts: CmsCollection = {
  name: 'contacts',
  label: 'Contacts',
  create: true,
  delete: true,
  format: 'json',
  folder: 'public/content/contacts',
  media_folder: '{{media_folder}}/contacts',
  public_folder: '{{public_folder}}/contacts',
  identifier_field: 'name',
  slug: '{{year}}{{month}}{{day}}{{hour}}{{minute}}{{second}}-{{slug}}',
  fields: [
    {
      label: 'Hidden',
      name: 'hidden',
      widget: 'boolean',
      default: false,
      required: false,
    },
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
      required: true,
    },
    {
      label: 'E-mail',
      name: 'email',
      widget: 'string',
      required: true,
    },
    {
      label: 'Phone number',
      name: 'phone',
      widget: 'string',
      required: true,
    },
  ],
};
