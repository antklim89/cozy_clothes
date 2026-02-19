import { getFeedbacks } from '@/entities/feedbacks/services';
import { Feedbacks } from '@/entities/feedbacks/ui';
import { ErrorComponent } from '@/shared/ui/error-component';
import { ParamsSchema } from '../params';

async function Page({ params }: PageProps<'/products/[productId]'>) {
  const { productId } = await ParamsSchema.parseAsync(await params);

  const { result: feedbacks, error } = await getFeedbacks({ productId });
  if (error) return <ErrorComponent error={error} />;

  return <Feedbacks feedbacks={feedbacks} />;
}

export default Page;
