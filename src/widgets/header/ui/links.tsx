import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { links } from '../model/links';


export function Links({ className }: { className?: string }) {
  return (
    <nav>
      <ul className={cn('flex items-center', className)}>
        {links.map(({ href, label }) => (
          <li className="w-full" key={label}>
            <Button asChild className="w-full" variant="ghost">
              <Link href={href}>{label}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}


