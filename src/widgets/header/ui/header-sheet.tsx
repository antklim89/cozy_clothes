import { MenuIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

export function HeaderSheet({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetHeader className="mt-4">
          <SheetTitle>
            Cozy Clothes
          </SheetTitle>
          <SheetDescription className="invisible">
            Navigation menu.
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
