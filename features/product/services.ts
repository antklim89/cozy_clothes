import '@/lib/server-only';
import { getPayload } from 'payload';
import type { PaginatedDocs } from 'payload';
import { err, ok } from '@/lib/result';
import config from '@/payload.config';
import { PRODUCTS_PER_PAGE } from './constants';
import type { GetManyProductsOptions, ProductType } from './types';


export async function getOneProduct(id: ProductType['id']) {
  try {
    const payload = await getPayload({ config });

    const productPayloadResult = await payload.findByID({
      collection: 'products',
      id,
      depth: 1,
    });

    const productResult = {
      ...productPayloadResult,
      variants: productPayloadResult.variants?.docs,
    };

    return ok(productResult as ProductType);
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFound') {
      return err({ type: 'not-found', message: `Product with id "${id}" not found.` });
    }
    return err({ type: 'unexpected', message: `Failed to fetch product with id "${id}". Try again later.` });
  }
}

export async function getManyProducts({
  limit,
  category,
  minPrice,
  maxPrice,
  search,
  countries,
  ...options
}: GetManyProductsOptions) {
  try {
    const payload = await getPayload({ config });

    const productsPayloadResult = await payload.find({
      limit: limit ?? PRODUCTS_PER_PAGE,
      ...options,
      where: {
        country: countries != null ? { in: countries } : {},
        category: category != null ? { equals: category } : {},
        price: (minPrice != null && maxPrice != null)
          ? { greater_than_equal: minPrice, less_than_equal: maxPrice }
          : minPrice != null
            ? { greater_than_equal: minPrice }
            : maxPrice != null
              ? { less_than_equal: maxPrice }
              : {},
        or: [
          search != null ? { title: { contains: search } } : {},
          search != null ? { description: { contains: search } } : {},
        ],
      },
      collection: 'products',
      depth: 1,
    });

    const productsResult = {
      ...productsPayloadResult,
      docs: productsPayloadResult.docs.map(i => ({
        ...i,
        variants: i.variants?.docs,
      })),
    };

    return ok(productsResult as PaginatedDocs<ProductType>);
  } catch (error) {
    console.error('Error: \n', error);
    return err({ type: 'unexpected', message: 'Failed to fetch product list. Try again later.' });
  }
}

export async function getAllProductIds() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'products',
      limit: Number.MAX_SAFE_INTEGER,
      depth: 0,
      select: {
        // @ts-expect-error id exists
        id: true,
      },
    });

    const ids = result.docs.map(i => i.id);

    return ok(ids);
  } catch (error) {
    console.error('Error: \n', error);
    return err({ type: 'unexpected', message: 'Failed to fetch product ids. Try again later.' });
  }
}
