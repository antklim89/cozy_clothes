import { ProductsListFallback } from '@/entities/products/ui';

function Loading() {
  return (
    <section className="container my-8">
      <h2 className="mb-4 text-2xl">Favorites Products</h2>
      <ProductsListFallback />
    </section>
  );
}

export default Loading;
