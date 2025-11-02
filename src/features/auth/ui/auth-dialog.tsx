'use client';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Auth } from '@/features/auth/ui';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';


export function AuthDialog({ button, type: defaultType = 'login' }: { button?: ReactNode; type?: 'login' | 'register' }) {
  const [type, setType] = useState(defaultType);

  return (
    <Dialog>
      <DialogTrigger asChild onClick={() => setType(defaultType)}>
        {button}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-col items-center gap-2 text-center">
          <DialogTitle className="text-2xl font-bold">{type === 'login' ? 'Login' : 'Register'} to your account</DialogTitle>
          <DialogDescription className="text-center text-balance text-sm text-muted-foreground">
            Enter your email and password below to {type === 'login' ? 'login to your account' : 'register a new account'}
          </DialogDescription>
        </DialogHeader>

        <Auth type={type} />

        {type === 'login'
          ? (
              <div className="flex items-center justify-center">
                Don&apos;t have an account?
                {' '}
                <Button className="underline underline-offset-4" variant="ghost" onClick={() => setType('register')}>
                  Register
                </Button>
              </div>
            )
          : (
              <div className="flex items-center justify-center">
                Already have an account?
                {' '}
                <Button className="underline underline-offset-4" variant="ghost" onClick={() => setType('login')}>
                  Log in
                </Button>
              </div>
            )}
      </DialogContent>
    </Dialog>
  );
}
