import type { UserType } from '@/entities/user/model';

export function AuthMenuAvatar({ user }: { user: UserType }) {
  const nameInitials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`;
  const initials = nameInitials.length === 0 ? user.email[0] || 'A' : nameInitials;

  return (
    <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-xs uppercase leading-0">
      {initials}
    </span>
  );
}
