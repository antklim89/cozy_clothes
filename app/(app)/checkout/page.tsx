import type { Metadata } from 'next';
import { CartCheckoutList } from '@/components/feature/cart-checkout-list';
import { CartCheckoutTotal } from '@/components/feature/cart-checkout-total';
import { CheckoutForm } from '@/components/form/checkout-form';


export const metadata: Metadata = {
  title: 'Cart',
};

function ProductPage() {
  return (
    <section className="container my-8 grid gap-4 grid-cols-1 md:grid-cols-[2fr_1fr]">
      <CheckoutForm />
      <aside className="flex flex-col space-y-4">
        <CartCheckoutList />
        <CartCheckoutTotal />
      </aside>
    </section>
  );
}

export default ProductPage;
