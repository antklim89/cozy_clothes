import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { About, AboutMedia } from '@/entities/about/model';
import { Cart } from '@/entities/cart/model';
import { Contacts } from '@/entities/contacts/model';
import { Hero, HeroMedia } from '@/entities/hero/model';
import { ProductCategories } from '@/entities/product-categories/model';
import { ProductCountries } from '@/entities/product-countries/models';
import { ProductBases, ProductMedia, Products } from '@/entities/products/model';
import { Seo, SeoMedia } from '@/entities/seo/models';
import { Testimonials, TestimonialsMedia } from '@/entities/testimonials/model';
import { Users } from '@/entities/user/model';
import { Admins } from '@/shared/model/collections/admins';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  blocks: [
    {
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
    },
  ],
  globals: [About, Hero, Seo],
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
    outputFile: path.resolve(dirname, 'src/shared/model/types/payload-types.generated.ts'),
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
