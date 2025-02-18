'use server';
import { getPayload } from 'payload';
import type { CategoryType } from '@/lib/types';
import config from '@/payload.config';


export async function fetchCategories(): Promise<CategoryType[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'categories',
    pagination: false,
  });

  return result.docs;
}
