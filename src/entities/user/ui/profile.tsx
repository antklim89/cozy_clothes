import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import type { UserProfileType } from '../model';

export function Profile({ userProfile }: { userProfile: UserProfileType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-4xl">Your profile</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert">
        <p className="font-bold text-lg">
          {userProfile.firstName} {userProfile.lastName}
        </p>
        {userProfile.address.length > 0 && <p>Address: {userProfile.address}</p>}
        {userProfile.phone.length > 0 && <p>Phone: {userProfile.phone}</p>}
      </CardContent>
    </Card>
  );
}
