import { productsLoader } from '@/lib';
import ProductCard from './product-card';

async function ProductsList() {
  const products = await productsLoader({ skip: 5 });

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsList;
