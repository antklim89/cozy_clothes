'use client';
import { LogInIcon, LogOut, UserIcon, UserPlus } from 'lucide-react';

import { useUserQuery } from '@/entities/user/hooks';
import { Button } from '@/shared/ui/button';
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
import { LogoutButton } from './logout-button';

export function AuthMenu() {
  const { user } = useUserQuery();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="User Menu" variant="ghost">
          <UserIcon className="size-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56" side="bottom" sideOffset={4}>
        {user != null ? (
          <>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">{user.email}</div>
            </DropdownMenuLabel>
            <Separator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <LogoutButton className="w-full justify-start space-x-4" variant="ghost">
                  <LogOut className="size-8" />
                  <span>Log out</span>
                </LogoutButton>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        ) : (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <AuthDialog
                  button={
                    <Button className="w-full justify-start space-x-4" variant="ghost">
                      <LogInIcon className="size-8" />
                      <span>Log In</span>
                    </Button>
                  }
                  type="login"
                />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <AuthDialog
                  button={
                    <Button className="w-full justify-start space-x-4" variant="ghost">
                      <UserPlus className="size-8" />
                      <span>Register</span>
                    </Button>
                  }
                  type="register"
                />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
