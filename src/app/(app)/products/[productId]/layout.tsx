export default function Layout({ feedbacks, product }: LayoutProps<'/products/[productId]'>) {
  return (
    <div className="flex flex-col gap-4">
      {product}
      {feedbacks}
    </div>
  );
}
