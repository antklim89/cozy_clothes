import '@/lib/server-only';
import { getPayload } from 'payload';
import { err, ok } from '@/lib/result';
import config from '@/payload.config';


export async function getCategories() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'product-categories',
      pagination: false,
    });

    return ok(result.docs);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return err({ type: 'unexpected', message: 'Failed to fetch categories' });
  }
}
