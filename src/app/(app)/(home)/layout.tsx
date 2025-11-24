function Layout({
  'new-products': newProducts,
  hero,
  testimonials,
  'categories-nav-bar': categoriesNavBar,
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
