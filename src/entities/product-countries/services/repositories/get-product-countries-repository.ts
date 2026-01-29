import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';

export async function getProductCountriesRepository({ name }: { name?: string } = {}) {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'product-countries',
      pagination: false,
      limit: 10000,
      where: {
        name: name != null ? { contains: name } : {},
      },
    });

    return ok(result.docs);
  } catch (error) {
    console.error(error);
    return errUnexpected('Failed to fetch countries');
  }
}
