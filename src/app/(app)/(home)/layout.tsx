function Layout({
  hero,
  'discount-products': discountProducts,
  'new-products': newProducts,
  testimonials,
  contacts,
  'product-category-nav-bar': productCategoryNavBar,
}: LayoutProps<'/'>) {
  return (
    <>
      {hero}
      {productCategoryNavBar}
      {newProducts}
      {testimonials}
      {discountProducts}
      {contacts}
    </>
  );
}

export default Layout;
