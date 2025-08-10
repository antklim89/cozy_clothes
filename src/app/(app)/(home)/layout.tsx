import type { ReactNode } from 'react';


function Layout({
  new_products: newProducts,
  hero,
  testimonials,
  contacts,
}: {
  new_products: ReactNode;
  hero: ReactNode;
  testimonials: ReactNode;
  contacts: ReactNode;
}) {
  return (
    <>
      {hero}
      {newProducts}
      {testimonials}
      {contacts}
    </>
  );
}

export const revalidate = 18000;

export default Layout;
