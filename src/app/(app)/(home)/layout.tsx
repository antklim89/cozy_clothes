import type { ReactNode } from 'react';


function Layout({
  new_products: newProducts,
  hero,
  testimonials,
}: {
  new_products: ReactNode;
  hero: ReactNode;
  testimonials: ReactNode;
}) {
  return (
    <>
      {hero}
      {newProducts}
      {testimonials}
    </>
  );
}

export const revalidate = 18000;

export default Layout;
