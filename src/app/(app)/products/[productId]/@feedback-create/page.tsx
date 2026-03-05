import { checkMyFeedback } from '@/entities/feedbacks/services';
import { FeedbackCreate } from '@/features/feedback-edit/ui';
import { Alert, AlertDescription } from '@/shared/ui/alert';
import { ErrorComponent } from '@/shared/ui/error-component';
import { ParamsSchema } from '../params';

async function Page({ params }: PageProps<'/products/[productId]'>) {
  const { productId } = await ParamsSchema.parseAsync(await params);
  const { result: hasFeedback, error } = await checkMyFeedback({ productId });
  if (error && error.type === 'unauthenticated') {
    return (
      <Alert className="container">
        <AlertDescription className="flex justify-center">Log in to leave a feedback.</AlertDescription>
      </Alert>
    );
  }
  if (error) return <ErrorComponent error={error} />;

  if (hasFeedback) {
    return (
      <Alert className="container">
        <AlertDescription className="flex justify-center">You have already left a feedback.</AlertDescription>
      </Alert>
    );
  }

  return <FeedbackCreate productId={productId} />;
}

export default Page;
