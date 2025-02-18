import { fetchProducts } from '@/actions/products';
import { ProductCard } from '@/components/feature/product-card';
import { ProductsList, ProductsListContent, ProductsListTitle } from '@/components/feature/products-list';
import { Contacts } from '@/components/layout/contacts';
import { Hero } from '@/components/layout/hero';
import { Testimonials } from '@/components/layout/testimonials';


async function HomePage() {
  const newSortedProducts = await fetchProducts({
    limit: 8,
    sort: '-createdAt',
  });
  const discountSortedProducts = await fetchProducts({
    limit: 8,
    sort: '-discount',
  });

  return (
    <div>
      <Hero />
      <ProductsList className="my-8">
        <ProductsListTitle>New products</ProductsListTitle>
        <ProductsListContent>
          {newSortedProducts.docs.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsListContent>
      </ProductsList>

      <Testimonials />

      <ProductsList className="my-8" title="Big discounts">
        <ProductsListTitle>New products</ProductsListTitle>
        <ProductsListContent>
          {discountSortedProducts.docs.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsListContent>
      </ProductsList>

      <Contacts />
    </div>
  );
}

export default HomePage;
