import { getUserProfile } from '@/entities/user/services';
import { UserUpdate } from '@/features/user-edit/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

async function Page() {
  const { result: userProfile, error } = await getUserProfile();
  if (error) return <ErrorComponent error={error} />;

  return (
    <section>
      <UserUpdate userProfile={userProfile} />
    </section>
  );
}

export default Page;
