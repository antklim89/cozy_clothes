import { getMe } from '@/entities/user/services';
import { CartWidgetOrder } from '@/widgets/cart-widget/ui';

export async function CartOrderSection() {
  const user = await getMe();

  return <CartWidgetOrder isAuth={user != null} />;
}
