import 'server-only';
import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';


export async function getProductCategoriesRepository() {
  try {
    const payload = await getPayload();
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
