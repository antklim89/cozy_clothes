import { Search } from '@/components/feature/search';
import { productsLoader } from '@/lib/contentLoaders';

const SearchPage = async () => {
  const products = await productsLoader();

  return <Search products={products} />;
};

export default SearchPage;
