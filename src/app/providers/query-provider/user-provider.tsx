import { getMe } from '@/entities/user/services';
import { UserProviderClient } from './user-provider-client';

export async function UserProvider() {
  const user = await getMe();

  return <UserProviderClient user={user} />;
}
