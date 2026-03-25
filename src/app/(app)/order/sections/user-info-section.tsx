import { getUserProfile } from '@/entities/user/services';
import { CreateOrder } from '@/features/create-order/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

export async function UserInfoSection() {
  const { result: userProfile, error } = await getUserProfile();
  if (error) return <ErrorComponent error={error} />;

  return <CreateOrder userProfile={userProfile} />;
}
