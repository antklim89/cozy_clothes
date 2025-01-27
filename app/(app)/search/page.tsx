import { Search } from '@/components/feature/search';
import { productsLoader } from '@/lib/content-loaders';


async function SearchPage() {
  const products = await productsLoader();

  return <Search products={products} />;
}

export default SearchPage;
