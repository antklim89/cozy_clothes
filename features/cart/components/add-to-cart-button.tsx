'use client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCartStoreIsHydrated } from '@/features/cart/hooks/useCartStoreHydrated';
import { useCartStore } from '@/features/cart/store';
import type { CartItem } from '@/features/cart/types';


type Props = Pick<CartItem, 'product' | 'variant'>;

export function AddToCartButton({ product, variant }: Props) {
  const addToCart = useCartStore(store => store.addToCart);
  const removeFromCart = useCartStore(store => store.removeFromCart);
  const hasCartItem = useCartStore(store => store.cartItems.some(i => (i.product.id === product.id && i.variant.id === variant.id)));

  function handleAddOrRemove() {
    if (hasCartItem) {
      removeFromCart({
        productId: product.id,
        variantId: variant.id,
      });
    } else {
      addToCart({
        product,
        qty: 1,
        variant,
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
