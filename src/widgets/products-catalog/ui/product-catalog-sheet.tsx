'use client';
import type { ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';
import type { ButtonProps } from '@/shared/ui/button';
import { buttonVariants } from '@/shared/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet';

export function ProductCatalogSheet({
  children,
  className,
  variant,
  size,
  ...props
}: { children: ReactNode } & ButtonProps & VariantProps<typeof buttonVariants>): ReactNode {
  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ variant, size }), className)} {...props}>
        Filter
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filter products</SheetTitle>
          <SheetDescription>Filtering products by name, price, category, etc.</SheetDescription>
        </SheetHeader>
        <div className="gap-6 overflow-y-auto px-4 py-8">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
