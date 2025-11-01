import 'server-only';
import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';


export async function getCountriesRepository({ name }: { name?: string } = {}) {
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
    console.error('Error fetching countries:', error);
    return err({ type: 'unexpected', message: 'Failed to fetch countries' });
  }
}
