import { Search } from '@/components/feature/search';
import { productsLoader } from '@/lib/contentLoaders';


async function SearchPage() {
  const products = await productsLoader();

  return <Search products={products} />;
}

export default SearchPage;
