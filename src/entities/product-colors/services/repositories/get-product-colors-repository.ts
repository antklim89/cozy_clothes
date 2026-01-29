import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';

export async function getProductColorsRepository() {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'product-colors',
      pagination: false,
      limit: 200,
    });

    return ok(result.docs);
  } catch (error) {
    console.error(error);
    return errUnexpected('Failed to fetch colors');
  }
}
