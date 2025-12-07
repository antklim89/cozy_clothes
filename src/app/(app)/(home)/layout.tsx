function Layout({
  new_products: newProducts,
  hero,
  testimonials,
  categories_nav_bar: categoriesNavBar,
  contacts,
}: LayoutProps<'/'>) {
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

export default Layout;
