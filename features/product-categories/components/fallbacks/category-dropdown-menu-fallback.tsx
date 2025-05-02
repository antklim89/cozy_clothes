import { DropdownMenuItem, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';


export function CategoryDropdownMenuFallback() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <DropdownMenuLabel className="text-center">Categories</DropdownMenuLabel>
        {Array.from({ length: 12 }, (_, index) => (
          <li key={index}>
            <DropdownMenuItem asChild className="flex justify-center cursor-pointer">
              <Skeleton className="h-4 w-full" key={index} />
            </DropdownMenuItem>
          </li>
        ))}
      </ul>
    </nav>
  );
}
