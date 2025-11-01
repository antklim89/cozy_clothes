'use client';
import type { ReactNode } from 'react';
import { Button } from '@/shared/ui/button';
import type { ButtonProps } from '@/shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';


export function ProductCatalogSheet({ children, ...props }: { children: ReactNode } & ButtonProps): ReactNode {
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
            Filtering products by name, price, category, etc.
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
