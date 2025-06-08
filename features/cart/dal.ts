// eslint-disable-next-line no-restricted-imports
import { authService } from '@/features/users/services';
import { err } from '@/lib/result';
import { getCartService } from './services';


export async function getCartAction() {
  const user = await authService();
  if (user == null) return err({ type: 'unauthorized', message: 'You are not logged in' });

  const result = await getCartService({ userId: user.id });
  return result;
}
