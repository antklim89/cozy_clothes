import type { ReactNode } from 'react';


function Layout({ new_products: newProducts }: { new_products: ReactNode }) {
  return (
    <>
      {newProducts}
    </>
  );
}

export const revalidate = 18000;

export default Layout;
