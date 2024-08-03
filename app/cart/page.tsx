import { Cart } from '@/components/feature/cart';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart',
};

const ProductPage = () => {
  return <Cart className="my-8" />;
};

export default ProductPage;
