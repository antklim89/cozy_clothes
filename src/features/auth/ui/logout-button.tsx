'use client';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

import type { ButtonProps } from '@/shared/ui/button';
import { Button } from '@/shared/ui/button';
import { logoutAction } from '../api/actions';

export function LogoutButton({ children, ...props }: ButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
      location.reload();
    });
  }

  return (
    <Button {...props} disabled={isPending} onClick={handleLogout}>
      {children}
      {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
    </Button>
  );
}
