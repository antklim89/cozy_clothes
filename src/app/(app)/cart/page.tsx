import { CartCheckout } from '@/entities/cart/ui';
import { getMe } from '@/entities/user/services';
import { Cart } from '@/widgets/cart/ui';

async function Page() {
  const user = await getMe();

  return <Cart checkout={<CartCheckout isAuth={user != null} />} />;
}

export default Page;
