'use client';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
import { CheckoutForm } from '../form/checkout-form';
import CartCheckoutList from './cart-checkout-list';
import { CartCheckoutTotal } from './cart-checkout-total';

export const Cart = ({ className, ...props }: ComponentProps<'section'>) => {
  return (
    <section {...props} className={cn('container grid gap-4 grid-cols-1 md:grid-cols-[2fr_1fr]', className)}>
      <CheckoutForm />
      <aside className="flex flex-col space-y-4">
        <CartCheckoutList />
        <CartCheckoutTotal />
      </aside>
    </section>
  );
};
export default Cart;
