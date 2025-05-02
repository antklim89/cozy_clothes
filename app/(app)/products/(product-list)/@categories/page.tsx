import { CategoryNavBar, fetchCategories } from '@/features/product-categories';


async function Page() {
  const { type, result: categories } = await fetchCategories();
  if (type === 'error') return null;

  return <CategoryNavBar categories={categories} />;
}

export default Page;
