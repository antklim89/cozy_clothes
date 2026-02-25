import { getFeedbacks } from '@/entities/feedbacks/services';
import { getMe } from '@/entities/user/services';
import { FeedbackUpdate } from '@/features/feedback-edit/ui';
import { Card, CardDescription } from '@/shared/ui/card';
import { ErrorComponent } from '@/shared/ui/error-component';
import { ParamsSchema } from '../params';

async function Page({ params }: PageProps<'/products/[productId]'>) {
  const { productId } = await ParamsSchema.parseAsync(await params);

  const { result: feedbacks, error } = await getFeedbacks({ productId });
  if (error) return <ErrorComponent error={error} />;
  const user = await getMe();

  if (!user) return null;
  if (feedbacks.docs.some(feedback => feedback.user.id === user.id)) {
    return (
      <Card className="container">
        <CardDescription className="flex justify-center">You have already left a feedback.</CardDescription>
      </Card>
    );
  }

  return <FeedbackUpdate productId={productId} />;
}

export default Page;
