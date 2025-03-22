'use client';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import type { ButtonProps } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';


export function ProductSheet({ children, ...props }: { children: ReactNode } & ButtonProps): ReactNode {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button {...props}>Filter</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="mb-8">
          <SheetTitle>
            Filter products
          </SheetTitle>
          <SheetDescription>
            Filtering producsts by name, price, category, etc.
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
