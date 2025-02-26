'use client';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import type { ProductType, ProductVariantType } from '@/lib/types';


interface Props {
  product: ProductType;
}

export function AddToCartButton({ product }: Props) {
  const searchParams = useSearchParams();

  const qty = z.coerce.number().default(1).catch(1).parse(searchParams.get('qty'));
  const variantId = z.coerce.number().optional().catch(undefined).parse(searchParams.get('v'));
  if (variantId == null) return;
  const variant = product.variants.find(i => i.id === variantId) ?? product.variants[0];
  if (variant == null) return;

  return <AddToCartButtonChild product={product} qty={qty} variant={variant} />;
}

function AddToCartButtonChild({ product, variant, qty }: { product: ProductType; variant: ProductVariantType; qty: number }) {
  const addToCart = useCartStore(store => store.addToCart);
  const removeFromCart = useCartStore(store => store.removeFromCart);
  const hasCartItem = useCartStore(store => store.cartItems.some(i => (i.product.id === product.id && i.variant.id === variant.id)));

  const handleAddToCart = () => {
    addToCart({
      product,
      qty,
      variant,
    });
  };

  const handleRemoveFromCart = () => {
    removeFromCart({
      productId: product.id,
      variantId: variant.id,
    });
  };

  if (hasCartItem) return <Button onClick={handleRemoveFromCart}>Remove From Cart</Button>;
  return <Button onClick={handleAddToCart}>Add To Cart</Button>;
}
