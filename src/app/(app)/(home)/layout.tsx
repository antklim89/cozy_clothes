import type { ReactNode } from 'react';


function Layout({
  new_products: newProducts,
  hero,
  testimonials,
  categories_nav_bar: categoriesNavBar,
  contacts,
}: {
  new_products: ReactNode;
  hero: ReactNode;
  testimonials: ReactNode;
  contacts: ReactNode;
  categories_nav_bar: ReactNode;
}) {
  return (
    <>
      {hero}
      {categoriesNavBar}
      {newProducts}
      {testimonials}
      {contacts}
    </>
  );
}

export const revalidate = 18000;

export default Layout;
