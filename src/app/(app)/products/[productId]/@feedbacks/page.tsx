import { getFeedbacks } from '@/entities/feedbacks/services';
import { ErrorComponent } from '@/shared/ui/error-component';
import { FeedbacksList } from '@/widgets/feedbacks-list/ui';
import { ParamsSchema, SearchParamsSchema } from '../params';

async function Page({ params, searchParams }: PageProps<'/products/[productId]'>) {
  // TODO: add use cache
  const { productId } = await ParamsSchema.parseAsync(await params);
  const options = await SearchParamsSchema.parseAsync(await searchParams);

  const { result: feedbacks, error } = await getFeedbacks({ productId, options });
  if (error) return <ErrorComponent error={error} />;

  return <FeedbacksList feedbacks={feedbacks} />;
}

export default Page;
