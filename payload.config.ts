import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { Admins } from './hidden/collections/Admins';
import { About } from './hidden/features/about/collections/About';
import { AboutMedia } from './hidden/features/about/collections/AboutMedia';
import { Contacts } from './hidden/features/contacts/collections/Contacts';
import { ProductCategories } from './hidden/features/product-categories/collections/ProductCategories';
import { ProductCountries } from './hidden/features/product-countries/collections/ProductCountries';
import { Testimonials } from './hidden/features/testimonials/collections/Testimonials';
import { TestimonialsMedia } from './hidden/features/testimonials/collections/TestimonialsMedia';
import { Cart } from './src/entities/cart/model';
import { Hero } from './src/entities/hero/model/collections';
import { HeroMedia } from './src/entities/hero/model/collections';
import { ProductBases, ProductMedia, Products } from './src/entities/products/model';
import { Seo } from './src/entities/seo/models';
import { SeoMedia } from './src/entities/seo/models/collections';
import { Users } from './src/entities/user/model';


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);


export default buildConfig({
  admin: {
    user: Admins.slug,
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
    Admins,
    SeoMedia,
    Cart,
    Contacts,
    AboutMedia,
    Products,
    ProductBases,
    ProductMedia,
    ProductCategories,
    ProductCountries,
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

