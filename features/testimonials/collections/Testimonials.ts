import type { CollectionConfig } from 'payload';


export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      label: 'Author Image',
      name: 'image',
      relationTo: 'testimonials-media',
      type: 'upload',
      required: true,
      hasMany: false,
    },
    {
      label: 'Text',
      name: 'text',
      type: 'textarea',
      required: true,
      minLength: 5,
      maxLength: 10000,
    },
    {
      label: 'Author Name',
      name: 'name',
      type: 'text',
      required: true,
      minLength: 5,
      maxLength: 1000,
    },
  ],
};
