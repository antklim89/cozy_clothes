'use client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { ProductType, ProductVariantType } from '@/features/product';
import { useCartStoreIsHydrated } from '../hooks/useCartStoreHydrated';
import { useCartStore } from '../store';


interface Props {
  product: ProductType;
  variant: ProductVariantType;
}

export function AddToCartButton({ product, variant }: Props) {
  const addToCart = useCartStore(store => store.addToCart);
  const removeFromCart = useCartStore(store => store.removeFromCart);
  const hasCartItem = useCartStore(store => store.cartItems.some(i => (i.productId === product.id && i.variantId === variant.id)));

  function handleAddOrRemove() {
    if (hasCartItem) {
      removeFromCart({
        productId: product.id,
        variantId: variant.id,
      });
    } else {
      addToCart({
        colorName: variant.colorName,
        discount: product.discount,
        image: product.images[0]?.url,
        price: product.price,
        size: variant.size,
        title: product.title,
        variantId: variant.id,
        productId: product.id,
        qty: 1,
      });
    }
  }

  if (!useCartStoreIsHydrated()) {
    return (
      <Skeleton className="w-full">
        <Button className="w-full">
          Loading...
        </Button>
      </Skeleton>
    );
  }

  return (
    <Button className="w-full" onClick={handleAddOrRemove}>
      {hasCartItem ? 'Remove From Cart' : 'Add To Cart'}
    </Button>
  );
}
