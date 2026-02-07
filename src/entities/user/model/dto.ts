import type { User } from '@/shared/model/types/payload-types.generated';
import type { UserProfileType } from './types';

export function userProfileDto(data: User): UserProfileType {
  return {
    id: data.id,
    address: data.address || '',
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    phone: data.phone || '',
  };
}
