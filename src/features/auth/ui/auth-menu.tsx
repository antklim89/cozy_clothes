'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HeartIcon, LogInIcon, LogOut, User2Icon, UserCheck2Icon, UserPlus, UserPlus2Icon } from 'lucide-react';
import Link from 'next/link';

import { meQueryOptions } from '@/entities/user/api';
import { Button, buttonVariants } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { ErrorComponent } from '@/shared/ui/error-component';
import { Separator } from '@/shared/ui/separator';
import { Skeleton } from '@/shared/ui/skeleton';
import { AuthDialog } from './auth-dialog';
import { LogoutButton } from './logout-button';

export function AuthMenu() {
  const { data: user, isFetchedAfterMount, error, isError } = useQuery(meQueryOptions());
  const [type, setType] = useState<'login' | 'register' | null>(null);

  if (!isFetchedAfterMount)
    return (
      <Skeleton>
        <Button disabled variant="ghost">
          <User2Icon />
        </Button>
      </Skeleton>
    );

  if (isError) return <ErrorComponent error={error} />;

  return (
    <DropdownMenu>
      <AuthDialog type={type === 'login' ? 'login' : null} setType={setType} />
      <AuthDialog type={type === 'register' ? 'register' : null} setType={setType} />

      <DropdownMenuTrigger aria-label="User Menu" className={buttonVariants({ variant: 'ghost' })}>
        {user ? <UserCheck2Icon /> : <UserPlus2Icon />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56" side="bottom" sideOffset={4}>
        {user != null ? (
          <DropdownMenuGroup>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">{user.email}</div>
            </DropdownMenuLabel>

            <Separator />

            <DropdownMenuItem render={<Link href="/favorites" />}>
              <HeartIcon />
              <span>Favorites</span>
            </DropdownMenuItem>

            <DropdownMenuItem render={<LogoutButton className="w-full" />} nativeButton>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setType('login')}>
              <LogInIcon />
              <span>Log In</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setType('register')}>
              <UserPlus />
              <span>Register</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
