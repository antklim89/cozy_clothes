import { Suspense } from 'react';

import { Spinner } from '@/shared/ui/spinner';
import { ConfirmOrder, ConfirmOrderCartListFallback } from '@/widgets/confirm-order/ui';
import { CartSection } from './sections/cart-section';
import { UserInfoSection } from './sections/user-info-section';

export default function Page() {
  return (
    <ConfirmOrder
      userInfoSlot={
        <Suspense fallback={<Spinner className="m-auto my-16 size-16" />}>
          <UserInfoSection />
        </Suspense>
      }
      cartSlot={
        <Suspense fallback={<ConfirmOrderCartListFallback />}>
          <CartSection />
        </Suspense>
      }
    />
  );
}
