import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Auth } from './auth';

export function AuthDialog({
  type = 'login',
  setType,
}: {
  setType: (type: 'login' | 'register' | null) => void;
  type: 'login' | 'register' | null;
}) {
  return (
    <Dialog open={type != null} onOpenChange={v => (v ? null : setType(null))}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-col items-center gap-2 text-center">
          <DialogTitle className="font-bold text-2xl">
            {type === 'login' ? 'Login' : 'Register'} to your account
          </DialogTitle>
          <DialogDescription className="text-balance text-center text-muted-foreground text-sm">
            Enter your email and password below to{' '}
            {type === 'login' ? 'login to your account' : 'register a new account'}
          </DialogDescription>
        </DialogHeader>

        <Auth type={type ?? 'login'} />

        {type === 'login' ? (
          <div className="flex items-center justify-center">
            Don&apos;t have an account?{' '}
            <Button className="underline underline-offset-4" variant="ghost" onClick={() => setType('register')}>
              Register
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            Already have an account?{' '}
            <Button className="underline underline-offset-4" variant="ghost" onClick={() => setType('login')}>
              Log in
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
