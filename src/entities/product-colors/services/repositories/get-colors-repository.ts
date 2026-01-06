import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';

export async function getColorsRepository() {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'product-colors',
      pagination: false,
      limit: 200,
    });

    return ok(result.docs);
  } catch (error) {
    console.error('Error fetching colors:', error);
    return err({ type: 'unexpected', message: 'Failed to fetch colors' });
  }
}
