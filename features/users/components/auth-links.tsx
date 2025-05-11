'use client';
import {
  LogInIcon,
  LogOut,
  UserIcon,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { LogoutButton } from './logout-button';
import { useUser } from '../hooks/use-user';


export function AuthLinks() {
  const pathname = usePathname();
  const prevPath = (pathname === '/login' || pathname === '/register') ? '/' : pathname;

  const { data: user, isPending } = useUser();

  if (isPending) {
    return (
      <Button aria-label="User Menu">
        <Skeleton className="size-8 rounded-full" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="User Menu">
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-56"
        side="bottom"
        sideOffset={4}
      >
        {user != null
          ? (
              <>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    {user.email}
                  </div>
                </DropdownMenuLabel>
                <Separator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <LogoutButton className="space-x-4 cursor-pointer w-full justify-start" variant="ghost">
                      <LogOut className="size-6" />
                      <span>Log out</span>
                    </LogoutButton>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            )
          : (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link className="space-x-4 cursor-pointer" href={`/login#${prevPath}`}>
                      <LogInIcon className="size-6" />
                      <span>Log In</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link className="space-x-4 cursor-pointer" href={`/register#${prevPath}`}>
                      <UserPlus className="size-6" />
                      <span>Register</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
