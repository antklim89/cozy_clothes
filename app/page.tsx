import Script from 'next/script';
import { CategoriesNavBar } from '@/components/feature/categories-nav-bar';
import { ProductCard } from '@/components/feature/product-card';
import { ProductsList, ProductsListContent, ProductsListTitle } from '@/components/feature/products-list';
import { Contacts } from '@/components/layout/contacts';
import { Hero } from '@/components/layout/hero';
import { Testimonials } from '@/components/layout/testimonials';
import { productsLoader } from '@/lib/content-loaders';


async function HomePage() {
  const products = await productsLoader();

  const newSortedProducts = products.slice(0, 8);
  const discountSortedProducts = products.toSorted((a, b) => b.discount - a.discount).slice(0, 8);

  return (
    <div>
      <Hero />
      <CategoriesNavBar className="my-4" />

      <ProductsList className="my-8">
        <ProductsListTitle>New products</ProductsListTitle>
        <ProductsListContent>
          {newSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsListContent>
      </ProductsList>

      <Testimonials />

      <ProductsList className="my-8" title="Big discounts">
        <ProductsListTitle>New products</ProductsListTitle>
        <ProductsListContent>
          {discountSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsListContent>
      </ProductsList>

      <Contacts />
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
    </div>
  );
}

export default HomePage;
