'use client';
import { toast } from 'sonner';

import type { UserProfileType } from '@/entities/user/model';
import { Card, CardContent } from '@/shared/ui/card';
import { UserUpdateForm } from './user-update-form';
import { updateUserAction } from '../api/actions';
import type { UpdateUserType } from '../models/types';

export function UserUpdate({ userProfile }: { userProfile: UserProfileType }) {
  async function handleSubmit(input: UpdateUserType) {
    const { error } = await updateUserAction(input);
    if (error) return toast.error(error.message);
    toast.success('Profile updated successfully');
  }

  return (
    <Card>
      <CardContent>
        <UserUpdateForm userProfile={userProfile} onSubmit={handleSubmit} />
      </CardContent>
    </Card>
  );
}
