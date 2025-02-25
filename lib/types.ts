import type { PaginatedDocs } from 'payload';
import type {
  About,
  Category,
  Contact,
  Hero,
  Product,
  ProductVariant,
  Seo,
  Testimonial,
} from '@/payload-types';


export type Populated<T, K extends keyof T> = {
  [P in keyof T]: P extends K
    ? (T[P] extends Array<unknown> ? (Extract<T[P][number], object>)[] : Extract<T[P], object>)
    : T[P]
};
export type PopulatedPaginatedDocs<T extends PaginatedDocs, K extends keyof T['docs'][number]> = PaginatedDocs<Populated<T['docs'][number], K>>;


export type AboutType = Populated<About, 'image'>;
export type ContactType = Contact;
export type CategoryType = Category;
export type HeroType = Populated<Hero, 'image'>;
export type ProductType = Populated<Product, 'images' | 'category' | 'variants'>;
export type ProductVariantType = ProductVariant;
export type SeoType = Seo;
export type TestimonialType = Populated<Testimonial, 'image'>;
