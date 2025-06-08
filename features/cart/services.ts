import '@/lib/server-only';
import { cache } from 'react';
import { getPayload } from 'payload';
import type { PaginatedDocs } from 'payload';
import type { Merge } from 'type-fest';
import { err, ok } from '@/lib/result';
import type {
  Cart,
  Product,
  ProductMedia,
  ProductVariant,
} from '@/payload-types';
import config from '@/payload.config';
import type { CartItemType } from './types';
import type { ProductVariantType } from '../product';


type CartPayloadResult = Merge<Cart, {
  variant: Merge<ProductVariant, {
    product: Merge<Product, {
      images: ProductMedia[];
    }>;
  }>;
}>;

type CartPayloadByVariantIdsResult = Merge<ProductVariant, {
  product: Merge<Product, {
    images: ProductMedia[];
  }>;
}>;


export const getCartService = cache(async ({ userId }: { userId: number }) => {
  try {
    const payload = await getPayload({ config });

    const payloadResult = await payload.find({
      collection: 'cart',
      depth: 3,
      pagination: false,
      where: {
        user: {
          equals: userId,
        },
      },
    }) as PaginatedDocs<CartPayloadResult>;

    const cartResult: CartItemType[] = payloadResult.docs.map(i => ({
      id: i.id,
      variantId: i.variant.id,
      productId: i.variant.product.id,
      size: i.variant.size,
      colorName: i.variant.colorName,
      title: i.variant.product.title,
      discount: i.variant.product.discount,
      price: i.variant.product.price,
      image: i.variant.product.images[0]?.url ?? '/placeholder.jpg',
      qty: i.qty,
    }));

    return ok(cartResult);
  } catch (error) {
    console.error(error);
    return err({ type: 'unexpected', message: 'Failed to get cart.' });
  }
});

export const getCartByVariantIdsService = cache(async ({ variantIds }: { variantIds: ProductVariantType['id'][] }) => {
  try {
    const payload = await getPayload({ config });

    const payloadResult = await payload.find({
      collection: 'product-variants',
      depth: 3,
      pagination: false,
      where: {
        id: {
          in: variantIds,
        },
      },
    }) as PaginatedDocs<CartPayloadByVariantIdsResult>;

    const cartResult: CartItemType[] = payloadResult.docs.map(variant => ({
      variantId: variant.id,
      productId: variant.product.id,
      size: variant.size,
      colorName: variant.colorName,
      title: variant.product.title,
      discount: variant.product.discount,
      price: variant.product.price,
      image: variant.product.images[0]?.url ?? '/placeholder.jpg',
      qty: 1,
    }));

    return ok(cartResult);
  } catch (error) {
    console.error(error);
    return err({ type: 'unexpected', message: 'Failed to get cart.' });
  }
});

export const getCartItemByVariantIdService = cache(async ({ variantId }: { variantId: ProductVariantType['id'] }) => {
  try {
    const payload = await getPayload({ config });

    const payloadResult = await payload.findByID({
      collection: 'product-variants',
      depth: 3,
      id: variantId,
    }) as CartPayloadByVariantIdsResult;

    const cartResult: CartItemType = {
      variantId: payloadResult.id,
      productId: payloadResult.product.id,
      size: payloadResult.size,
      colorName: payloadResult.colorName,
      title: payloadResult.product.title,
      discount: payloadResult.product.discount,
      price: payloadResult.product.price,
      image: payloadResult.product.images[0]?.url ?? '/placeholder.jpg',
      qty: 1,
    };

    return ok(cartResult);
  } catch (error) {
    console.error(error);
    return err({ type: 'unexpected', message: 'Failed to get cart.' });
  }
});

export const addCartItemService = cache(async ({
  variantId,
  userId,
  qty = 1,
}: {
  variantId: number;
  userId: number;
  qty?: number;
}) => {
  try {
    const payload = await getPayload({ config });

    const payloadResult = await payload.create({
      collection: 'cart',
      depth: 3,
      data: {
        user: userId,
        variant: variantId,
        qty,
      },
    }) as CartPayloadResult;

    const result = {
      id: payloadResult.id,
      variantId: payloadResult.variant.id,
      productId: payloadResult.variant.product.id,
      size: payloadResult.variant.size,
      colorName: payloadResult.variant.colorName,
      title: payloadResult.variant.product.title,
      discount: payloadResult.variant.product.discount,
      price: payloadResult.variant.product.price,
      image: payloadResult.variant.product.images[0]?.url ?? '/placeholder.jpg',
      qty: payloadResult.qty,
    };

    return ok(result);
  } catch (error) {
    console.error(error);
    return err({ type: 'unexpected', message: 'Failed to add cart item.' });
  }
});

export const removeCartItemService = cache(async ({
  variantId,
  userId,
}: {
  variantId: number;
  userId: number;
}) => {
  try {
    const payload = await getPayload({ config });

    await payload.delete({
      collection: 'cart',
      where: {
        user: {
          equals: userId,
        },
        variant: {
          equals: variantId,
        },
      },
    });

    return ok(null);
  } catch (error) {
    console.error(error);
    return err({ type: 'unexpected', message: 'Failed to remove cart item.' });
  }
});

export const updateCartQtyService = cache(async ({
  variantId,
  userId,
  qty,
}: {
  variantId: number;
  userId: number;
  qty: number;
}) => {
  try {
    const payload = await getPayload({ config });

    await payload.update({
      collection: 'cart',
      data: {
        qty,
      },
      where: {
        user: {
          equals: userId,
        },
        variant: {
          equals: variantId,
        },
      },
    });

    return ok(null);
  } catch (error) {
    console.error(error);
    return err({ type: 'unexpected', message: 'Failed to update cart item.' });
  }
});
