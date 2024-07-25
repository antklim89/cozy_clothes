import { Cart } from '@/components/feature';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart',
};

function ProductPage() {
  return <Cart />;
}

export default ProductPage;
