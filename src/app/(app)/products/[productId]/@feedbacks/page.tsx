import { cacheLife } from 'next/cache';

import { feedbackCache, getFeedbacks } from '@/entities/feedbacks/services';
import { ErrorComponent } from '@/shared/ui/error-component';
import { FeedbacksList } from '@/widgets/feedbacks-list/ui';
import { ParamsSchema } from '../params';

async function Page({ params }: PageProps<'/products/[productId]'>) {
  'use cache';
  const { productId } = await ParamsSchema.parseAsync(await params);
  feedbackCache({ productId });
  cacheLife('seconds');

  const { result: feedbacks, error } = await getFeedbacks({ productId });
  if (error) return <ErrorComponent error={error} />;

  return <FeedbacksList feedbacks={feedbacks} />;
}

export default Page;
