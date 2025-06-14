'use client';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { Button } from '@/src/shared/ui/button';
import type { ButtonProps } from '@/src/shared/ui/button';
import { logoutAction } from '../actions';


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
      {isPending && <Loader2 className="animate-spin size-4 mr-2" />}
    </Button>
  );
}
