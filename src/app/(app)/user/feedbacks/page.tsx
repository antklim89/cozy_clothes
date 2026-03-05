import { redirect } from 'next/navigation';

import { getMyFeedbacks } from '@/entities/feedbacks/services';
import { ErrType } from '@/shared/lib/result';
import { ErrorComponent } from '@/shared/ui/error-component';
import { FeedbacksList } from '@/widgets/feedbacks-list/ui';
import { SearchParamsSchema } from './params';

async function Page({ searchParams }: PageProps<'/user/feedbacks'>) {
  const options = await SearchParamsSchema.parseAsync(await searchParams);
  const { result: feedbacks, error } = await getMyFeedbacks({ options });

  if (error && error.type === ErrType.UNAUTHENTICATED) return redirect('/');
  if (error) return <ErrorComponent error={error} />;

  return <FeedbacksList feedbacks={feedbacks} type="personal" />;
}

export default Page;
