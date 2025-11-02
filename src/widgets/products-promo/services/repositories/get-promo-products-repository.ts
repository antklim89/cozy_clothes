import 'server-only';
import { PRODUCTS_PER_PAGE } from '@/entities/products/config';
import type { ProductType } from '@/entities/products/model';
import { productPreviewDto } from '@/entities/products/model/dto';
import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';
import { paginationDto } from '@/shared/model/dto/pagination-dto';


export async function getPromoProductsRepository({ sort }: { sort: keyof ProductType }) {
  try {
    const payload = await getPayload();

    const productsPayloadResult = await payload.find({
      limit: PRODUCTS_PER_PAGE,
      collection: 'products',
      depth: 2,
      pagination: false,
      sort: `-${sort}`,
    });

    const productsResult = paginationDto(productsPayloadResult, productPreviewDto);
    return ok(productsResult.docs);
  } catch (error) {
    console.error('[Error getPromoProductsRepository]:', error);
    return err({ type: 'unexpected', message: 'Failed to fetch product list. Try again later.' });
  }
}
