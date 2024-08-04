'use client';
import { useCartStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps } from 'react';

export const CartButton = ({ className, ...props }: ComponentProps<'a'>) => {
  const cartItemsLength = useCartStore((state) => state.cartItems.length);

  return (
    <Link href="/checkout" {...props} className={cn('flex flex-nowrap', className)}>
      <ShoppingCart />
      <p className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{cartItemsLength}</p>
    </Link>
  );
};

export default CartButton;
