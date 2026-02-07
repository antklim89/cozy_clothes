import { getUserProfile } from '@/entities/user/services';
import { Profile } from '@/entities/user/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

async function Page() {
  const { result: userProfile, error } = await getUserProfile();
  if (error) return <ErrorComponent error={error} />;

  return <Profile userProfile={userProfile} />;
}

export default Page;
