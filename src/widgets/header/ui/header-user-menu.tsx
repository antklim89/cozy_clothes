import { Suspense } from 'react';
import { HeartIcon, LogOut, SettingsIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

import { getMe } from '@/entities/user/services';
import { AuthMenu, LogoutButton } from '@/features/auth/ui';
import { Button } from '@/shared/ui/button';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { Skeleton } from '@/shared/ui/skeleton';

export function HeaderUserMenu() {
  const userPromise = getMe();

  return (
    <Suspense
      fallback={
        <Skeleton>
          <Button disabled variant="ghost">
            <UserIcon />
          </Button>
        </Skeleton>
      }
    >
      {userPromise.then(user => (
        <AuthMenu
          privateItems={
            <>
              <DropdownMenuItem render={<Link href="/user/profile" />}>
                <UserIcon />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem render={<Link href="/user/settings" />}>
                <SettingsIcon />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuItem render={<Link href="/user/favorites" />}>
                <HeartIcon />
                <span>Favorites</span>
              </DropdownMenuItem>

              <DropdownMenuItem render={<LogoutButton className="w-full" />} nativeButton>
                <LogOut />
                <span>Log out</span>
              </DropdownMenuItem>
            </>
          }
          user={user}
        />
      ))}
    </Suspense>
  );
}
