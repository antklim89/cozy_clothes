import 'server-only';
import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';
import type { ProductType } from '../../model';
import { productDto } from '../../model/dto';


export async function getOneProductRepository(id: ProductType['id']) {
  try {
    const payload = await getPayload();

    const productPayloadResult = await payload.findByID({
      collection: 'products',
      id,
      depth: 2,
    });

    const productResult = productDto(productPayloadResult);

    return ok(productResult);
  } catch (error) {
    console.error('[Error getOneProductService]:', error);

    if (error instanceof Error && error.name === 'NotFound') {
      return err({ type: 'not-found', message: `Product with id "${id}" not found.` });
    }
    return err({ type: 'unexpected', message: `Failed to fetch product with id "${id}". Try again later.` });
  }
}
