import type { ReactNode } from 'react';
import { MenuIcon } from 'lucide-react';

import { buttonVariants } from '@/shared/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet';

export function HeaderSheet({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger className={buttonVariants({ variant: 'ghost' })}>
        <MenuIcon />
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetHeader className="mt-4">
          <SheetTitle className="text-center text-2xl">Navigation menu</SheetTitle>
          <SheetDescription className="invisible">Navigation menu</SheetDescription>
        </SheetHeader>
        <div className="flex h-full flex-col gap-6 px-4 py-8">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
