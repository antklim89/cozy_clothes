import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';

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
    return errUnexpected('Failed to fetch categories');
  }
}
