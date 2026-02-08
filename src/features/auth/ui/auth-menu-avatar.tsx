import type { UserType } from '@/entities/user/model';

export function AuthMenuAvatar({ user }: { user: UserType }) {
  const nameInitials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`;
  const initials = nameInitials.length === 0 ? user.email[0] || 'A' : nameInitials;

  return (
    <div className="m-0 flex size-7 items-center justify-center rounded-full bg-secondary">
      <span className="text-xs uppercase">{initials}</span>
    </div>
  );
}
