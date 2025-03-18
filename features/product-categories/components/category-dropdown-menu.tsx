import Link from 'next/link';
import { DropdownMenuItem, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { fetchCategories } from '@/features/product-categories';


export async function CategoryDropdownMenu() {
  const { type, result: categories } = await fetchCategories();
  if (type === 'error') return null;

  return (
    <nav>
      <ul>
        <DropdownMenuLabel className="text-center">Categories</DropdownMenuLabel>

        <li>
          <DropdownMenuItem asChild className="flex justify-center cursor-pointer">
            <Link href="/products">ALL</Link>
          </DropdownMenuItem>
        </li>

        {categories.map(category => (
          <li key={category.id}>
            <DropdownMenuItem asChild className="flex justify-center cursor-pointer">
              <Link href={`/products?category=${category.id}`}>{category.name}</Link>
            </DropdownMenuItem>
          </li>
        ))}
      </ul>
    </nav>
  );
}
