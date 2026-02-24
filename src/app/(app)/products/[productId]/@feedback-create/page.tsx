import { getMe } from '@/entities/user/services';
import { FeedbackUpdate } from '@/features/feedback-edit/ui';
import { ParamsSchema } from '../params';

async function Page({ params }: PageProps<'/products/[productId]'>) {
  const { productId } = await ParamsSchema.parseAsync(await params);
  const user = await getMe();

  if (!user) return null;
  return <FeedbackUpdate productId={productId} />;
}

export default Page;
