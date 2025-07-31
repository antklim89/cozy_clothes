import 'server-only';
import { PRODUCTS_PER_PAGE } from '@/src/entities/products/config';
import type { ProductType } from '@/src/entities/products/model';
import { productDto } from '@/src/entities/products/model/dto';
import { paginationDto } from '@/src/shared/dto/pagination-dto';
import { getPayload } from '@/src/shared/lib/payload';
import { err, ok } from '@/src/shared/lib/result';


export async function getPromoProductsRepository({ sort }: { sort: keyof ProductType }) {
  try {
    const payload = await getPayload();

    const productsPayloadResult = await payload.find({
      limit: PRODUCTS_PER_PAGE,
      collection: 'products',
      depth: 1,
      pagination: false,
      sort: `-${sort}`,
    });

    const productsResult = paginationDto(productsPayloadResult, productDto);
    return ok(productsResult.docs);
  } catch (error) {
    console.error('[Error getPromoProductsRepository]:', error);
    return err({ type: 'unexpected', message: 'Failed to fetch product list. Try again later.' });
  }
}
