import { getPayload } from 'payload';
import config from '@/payload.config';
import type { ProductCountryType } from './types';


export async function getCountries({ name }: { name?: string } = {}): Promise<ProductCountryType[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'product-countries',
    pagination: false,
    limit: 10000,
    where: {
      name: name != null ? { contains: name } : {},
    },
  });

  return result.docs;
}
