import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '@/shared/ui/button';
import { links } from '../model/links';

export function Links({ className }: { className?: string }) {
  return (
    <nav>
      <ul className={cn('flex items-center', className)}>
        {links.map(({ href, label }) => (
          <li className="w-full" key={label}>
            <Link className={buttonVariants({ variant: 'ghost', className: 'w-full' })} href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
