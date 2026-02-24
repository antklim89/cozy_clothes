export default function Layout(props: LayoutProps<'/products/[productId]'>) {
  return (
    <div className="flex flex-col gap-4">
      {props.product}
      {props['feedback-create']}
      {props.feedbacks}
    </div>
  );
}
