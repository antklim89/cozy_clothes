import type { ReactNode } from 'react';


function Layout({
  new_products: newProducts,
  hero,
}: {
  new_products: ReactNode;
  hero: ReactNode;
}) {
  return (
    <>
      {hero}
      {newProducts}
    </>
  );
}

export const revalidate = 18000;

export default Layout;
