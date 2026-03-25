import { Suspense } from 'react';

import { Spinner } from '@/shared/ui/spinner';
import { OrderWidget, OrderWidgetCartListFallback } from '@/widgets/order-widget/ui';
import { CartSection } from './sections/cart-section';
import { UserInfoSection } from './sections/user-info-section';

export default function Page() {
  return (
    <OrderWidget
      userInfoSlot={
        <Suspense fallback={<Spinner className="m-auto my-16 size-16" />}>
          <UserInfoSection />
        </Suspense>
      }
      cartSlot={
        <Suspense fallback={<OrderWidgetCartListFallback />}>
          <CartSection />
        </Suspense>
      }
    />
  );
}
