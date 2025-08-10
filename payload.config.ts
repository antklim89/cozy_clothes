import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { Admins } from './hidden/collections/Admins';
import { ProductCountries } from './hidden/features/product-countries/collections/ProductCountries';
import { About } from './src/entities/about/model';
import { AboutMedia } from './src/entities/about/model';
import { Cart } from './src/entities/cart/model';
import { Contacts } from './src/entities/contacts/model';
import { Hero } from './src/entities/hero/model';
import { HeroMedia } from './src/entities/hero/model/collections';
import { ProductCategories } from './src/entities/product-categories/model';
import { ProductBases, ProductMedia, Products } from './src/entities/products/model';
import { Seo } from './src/entities/seo/models';
import { SeoMedia } from './src/entities/seo/models/collections';
import { Testimonials, TestimonialsMedia } from './src/entities/testimonials/model';
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
    outputFile: path.resolve(dirname, 'src/shared/model/payload-types.generated.ts'),
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

