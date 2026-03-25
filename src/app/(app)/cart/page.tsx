import { Suspense } from 'react';

import { CartCheckout } from '@/entities/cart/ui';
import { getMe } from '@/entities/user/services';
import { Cart } from '@/widgets/cart/ui';

function Page() {
  const userPromise = getMe();

  return (
    <Cart
      orderSlot={
        <Suspense>
          {userPromise.then(user => (
            <CartCheckout isAuth={user != null} />
          ))}
        </Suspense>
      }
    />
  );
}

export default Page;
