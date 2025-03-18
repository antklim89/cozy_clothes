import type { Metadata } from 'next';
import { CheckoutForm } from '@/features/checkout';


export const metadata: Metadata = {
  title: 'Checkout',
};

function Page() {
  return (
    <section className="container my-8 grid gap-4 grid-cols-1 md:grid-cols-[2fr_1fr]">
      <CheckoutForm />
    </section>
  );
}

export default Page;
