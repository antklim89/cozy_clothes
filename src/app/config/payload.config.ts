/** biome-ignore-all lint/style/noRestrictedImports: payload cli throw error */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { About, AboutMedia } from '@/entities/about/model/collections';
import { Cart } from '@/entities/cart/model/collections';
import { Contacts } from '@/entities/contacts/model/collections';
import { Hero, HeroMedia } from '@/entities/hero/model/collections';
import { ProductCategories } from '@/entities/product-categories/model/collections';
import { ProductCountries } from '@/entities/product-countries/models/collections';
import { ProductBases, ProductFavorites, ProductMedia, Products } from '@/entities/products/model/collections';
import { Seo, SeoMedia } from '@/entities/seo/models/collections';
import { Testimonials, TestimonialsMedia } from '@/entities/testimonials/model/collections';
import { Users } from '@/entities/user/model/collections';
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
  globals: [About, Hero, Seo],
  collections: [
    Admins,
    SeoMedia,
    Cart,
    Contacts,
    AboutMedia,
    Products,
    ProductBases,
    ProductFavorites,
    ProductMedia,
    ProductCategories,
    ProductCountries,
    HeroMedia,
    Testimonials,
    TestimonialsMedia,
    Users,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve('src/shared/model/types/payload-types.generated.ts'),
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
