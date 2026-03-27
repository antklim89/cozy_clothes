import { Suspense } from 'react';

import { CartWidget } from '@/widgets/cart-widget/ui';
import { CartListSection } from './sections/cart-list-section';
import { CartOrderSection } from './sections/cart-order-section';
import { CartTotalSection } from './sections/cart-total-section';

function Page() {
  return (
    <CartWidget
      cartTotalSlot={<CartTotalSection />}
      cartListSlot={<CartListSection />}
      orderSlot={
        <Suspense>
          <CartOrderSection />
        </Suspense>
      }
    />
  );
}

export default Page;
