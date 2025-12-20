'use client';
import { type ComponentPropsWithRef, useTransition } from 'react';
import { Loader2 } from 'lucide-react';

import { logoutAction } from '../api/actions';

export function LogoutButton({ children, ...props }: ComponentPropsWithRef<'button'>) {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
      location.reload();
    });
  }

  return (
    <button {...props} type="button" disabled={isPending} onClick={handleLogout}>
      {children}
      {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
    </button>
  );
}
