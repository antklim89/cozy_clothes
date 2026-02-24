import { redirect } from 'next/navigation';

import { getMyFeedbacks } from '@/entities/feedbacks/services';
import { FeedbacksEmpty } from '@/entities/feedbacks/ui';
import { ErrType } from '@/shared/lib/result';
import { ErrorComponent } from '@/shared/ui/error-component';
import { FeedbacksList } from '@/widgets/feedbacks-list/ui';

async function Page() {
  const { result: feedbacks, error } = await getMyFeedbacks();

  if (error && error.type === ErrType.UNAUTHENTICATED) return redirect('/');
  if (error) return <ErrorComponent error={error} />;
  if (feedbacks.docs.length === 0) return <FeedbacksEmpty description=" You haven't added any feedback yet." />;

  return <FeedbacksList feedbacks={feedbacks} type="personal" />;
}

export default Page;
