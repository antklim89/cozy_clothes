import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { Users } from './collections/Users';
import { About } from './features/about/collections/About';
import { AboutMedia } from './features/about/collections/AboutMedia';
import { Contacts } from './features/contacts/collections/Contacts';
import { Hero } from './features/hero/collections/Hero';
import { HeroMedia } from './features/hero/collections/HeroMedia';
import { ProductCategories } from './features/product-categories/collections/ProductCategories';
import { ProductCountries } from './features/product-countries/collections/ProductCountries';
import { ProductMedia } from './features/product/collections/ProductMedia';
import { Products } from './features/product/collections/Products';
import { ProductVariants } from './features/product/collections/ProductVariants';
import { Seo } from './features/seo/collections/Seo';
import { Testimonials } from './features/testimonials/collections/Testimonials';
import { TestimonialsMedia } from './features/testimonials/collections/TestimonialsMedia';


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);


export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  blocks: [{
    slug: 'ColumnsBlock',
    fields: [
      {
        name: 'columns',
        type: 'array',
        required: true,
        defaultValue: [],
        fields: [
          {
            editor: lexicalEditor(),
            name: 'column',
            type: 'richText',
            required: true,
          },
        ],
      },
    ],
  }],
  globals: [
    About,
    Hero,
    Seo,
  ],
  collections: [
    ProductCountries,
    Contacts,
    AboutMedia,
    Products,
    ProductMedia,
    ProductVariants,
    ProductCategories,
    HeroMedia,
    Testimonials,
    TestimonialsMedia,
    Users,
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures, rootFeatures }) => [
      ...rootFeatures,
      ...defaultFeatures,
      BlocksFeature({
        blocks: ['ColumnsBlock'],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    migrationDir: path.resolve('migrations'),
    client: {
      url: 'file:./database.db',
    },
  }),
  sharp,
  graphQL: {
    disable: true,
  },
  plugins: [],
});

