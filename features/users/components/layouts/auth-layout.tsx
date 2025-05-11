import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import authScreenImg from '../../assets/auth-screen.png';


interface Props {
  type: 'login' | 'register';
  children: ReactNode;
}

export function AuthLayout({ children, type }: Props) {
  return (
    <div className="grid h-full lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="h-full flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">{type === 'login' ? 'Login' : 'Register'} to your account</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Enter your email and password below to {type === 'login' ? 'login' : 'register'} to your account
            </p>
          </div>
          <div className="w-full max-w-xs">
            {children}
          </div>
          {type === 'login'
            ? (
                <div className="text-center text-sm">
                  Don&apos;t have an account?
                  {' '}
                  <Link className="underline underline-offset-4" href="/register">
                    Register
                  </Link>
                </div>
              )
            : (
                <div className="text-center text-sm">
                  Already have an account?
                  {' '}
                  <Link className="underline underline-offset-4" href="/login">
                    Log in
                  </Link>
                </div>
              )}
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          src={authScreenImg}
        />
      </div>
    </div>
  );
}
