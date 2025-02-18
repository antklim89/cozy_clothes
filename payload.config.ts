import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { About, AboutMedia } from './collections/About';
import { Categories } from './collections/Categories';
import { Contacts } from './collections/Contacts';
import { Hero, HeroMedia } from './collections/Hero';
import { Products, ProductsMedia } from './collections/Products';
import { Seo } from './collections/Seo';
import { Testimonials, TestimonialsMedia } from './collections/Testimonials';
import { Users } from './collections/Users';


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);


export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [
    About,
    Hero,
    Seo,
  ],
  collections: [
    Contacts,
    TestimonialsMedia,
    AboutMedia,
    ProductsMedia,
    HeroMedia,
    Products,
    Categories,
    Testimonials,
    Users,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    migrationDir: path.resolve('migrations'),
    client: {
      url: process.env.DATABASE_URI ?? '',
    },
  }),
  sharp,
  graphQL: {
    disable: true,
  },
  plugins: [],
});

