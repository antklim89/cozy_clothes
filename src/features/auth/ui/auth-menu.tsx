'use client';
import { type ReactNode, useState } from 'react';
import { LogInIcon, UserIcon, UserPlusIcon } from 'lucide-react';

import type { UserType } from '@/entities/user/model';
import { buttonVariants } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Separator } from '@/shared/ui/separator';
import { AuthDialog } from './auth-dialog';
import { AuthMenuAvatar } from './auth-menu-avatar';

export function AuthMenu({ privateItems, user }: { privateItems: ReactNode; user: UserType | null }) {
  const [type, setType] = useState<'login' | 'register' | null>(null);

  return (
    <DropdownMenu>
      <AuthDialog type={type === 'login' ? 'login' : null} setType={setType} />
      <AuthDialog type={type === 'register' ? 'register' : null} setType={setType} />

      <DropdownMenuTrigger aria-label="User Menu" className={buttonVariants({ variant: 'ghost' })}>
        {user ? <AuthMenuAvatar user={user} /> : <UserIcon />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56" side="bottom" sideOffset={4}>
        {user != null ? (
          <DropdownMenuGroup>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">{user.email}</div>
            </DropdownMenuLabel>

            <Separator />

            {privateItems}
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setType('login')}>
              <LogInIcon />
              <span>Log In</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setType('register')}>
              <UserPlusIcon />
              <span>Register</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
