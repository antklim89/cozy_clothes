import { redirect } from 'next/navigation';

import { getMyFeedbacks } from '@/entities/feedbacks/services';
import { ErrType } from '@/shared/lib/result';
import { ErrorComponent } from '@/shared/ui/error-component';
import { FeedbacksWidget, FeedbacksWidgetList } from '@/widgets/feedbacks-widget/ui';
import { SearchParamsSchema } from './params';

async function Page({ searchParams }: PageProps<'/user/feedbacks'>) {
  const options = await SearchParamsSchema.parseAsync(await searchParams);
  const { result: feedbacks, error } = await getMyFeedbacks({ options });

  if (error && error.type === ErrType.UNAUTHENTICATED) return redirect('/');
  if (error) return <ErrorComponent error={error} />;

  return (
    <FeedbacksWidget title="My Feedbacks" totalFeedbacks={feedbacks.totalDocs}>
      <FeedbacksWidgetList feedbacks={feedbacks} type="personal" />
    </FeedbacksWidget>
  );
}

export default Page;
