'use client';
import { Button } from '@/components/ui';
import type { ProductType } from '@/lib/schemas';
import { type CartItem, useCartStore } from '@/lib/store';
import { useSearchParams } from 'next/navigation';
import {} from 'zustand/shallow';

interface Props {
  product: ProductType;
}

function CartButton({ product }: Props) {
  const searchParams = useSearchParams();
  const addToCart = useCartStore((store) => store.addToCart);
  const removeFromCart = useCartStore((store) => store.removeFromCart);
  const hasCartItem = useCartStore((store) => store.cartItems.findIndex((i) => i.product.id === product.id) >= 0);

  const handleAddToCart = () => {
    const newCartItem: CartItem = {
      product,
      qty: Number(searchParams.get('qty') ?? 1),
      size: searchParams.get('size'),
      color: searchParams.get('color'),
    };
    addToCart(newCartItem);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  if (hasCartItem) return <Button onClick={handleRemoveFromCart}>Remove From Cart</Button>;
  return <Button onClick={handleAddToCart}>Add To Cart</Button>;
}

export default CartButton;
