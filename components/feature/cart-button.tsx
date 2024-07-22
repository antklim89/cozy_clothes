'use client';
import { Button } from '@/components/ui';
import { useCartStore } from '@/lib/store';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

function CartButton() {
  const cartItemsLength = useCartStore((state) => state.cartItems.length);

  return (
    <Button asChild>
      <Link href="/cart" className="flex flex-nowrap">
        <ShoppingCart />
        <p className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{cartItemsLength}</p>
      </Link>
    </Button>
  );
}

export default CartButton;
