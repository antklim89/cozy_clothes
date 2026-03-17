import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '@/shared/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { ThemeToggle } from '@/shared/ui/theme-toggle/theme-toggle';
import { links } from '../model/links';

export function HeaderSheet() {
  return (
    <Sheet>
      <SheetTrigger className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
        <MenuIcon />
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetHeader className="mt-4">
          <SheetTitle className="invisible">Navigation menu</SheetTitle>
          <SheetDescription className="invisible">Navigation menu</SheetDescription>
        </SheetHeader>
        <div className="flex h-full flex-col gap-6 px-4 py-8">
          <nav>
            <ul className="flex flex-col gap-12">
              {links.map(({ href, label }) => (
                <li key={label}>
                  <SheetClose
                    nativeButton={false}
                    render={
                      <Link className={cn(buttonVariants({ variant: 'ghost' }), 'w-full text-4xl')} href={href} />
                    }
                  >
                    {label}
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex-1" />
          <ThemeToggle className="self-end" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
