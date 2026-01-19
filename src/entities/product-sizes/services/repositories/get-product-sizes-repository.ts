import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';

export async function getProductSizesRepository() {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'product-sizes',
      pagination: false,
      limit: 200,
    });

    return ok(result.docs);
  } catch (error) {
    console.error('Error fetching sizes:', error);
    return err({ type: 'unexpected', message: 'Failed to fetch sizes' });
  }
}
