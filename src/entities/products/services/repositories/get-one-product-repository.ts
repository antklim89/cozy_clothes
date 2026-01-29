import 'server-only';

import { NotFound } from 'payload';

import { getPayload } from '@/shared/lib/payload';
import { errNotFound, errUnexpected, ok } from '@/shared/lib/result';
import type { ProductType } from '../../model';
import { productDto } from '../../model/dto';

export async function getOneProductRepository(id: ProductType['id']) {
  try {
    const payload = await getPayload();

    const productPayloadResult = await payload.findByID({
      collection: 'products',
      id,
      depth: 3,
    });
    if (productPayloadResult._status !== 'published') return errNotFound('Product not found.');

    const productResult = productDto(productPayloadResult);

    return ok(productResult);
  } catch (error) {
    if (error instanceof NotFound) return errNotFound('Product not found.');
    console.error(error);
    return errUnexpected('Failed to get product. Try again later.');
  }
}
