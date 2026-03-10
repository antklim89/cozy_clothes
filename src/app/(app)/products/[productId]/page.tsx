import { Suspense } from 'react';

import { Skeleton } from '@/shared/ui/skeleton';
import { FeedbacksListFallback } from '@/widgets/feedbacks-list/ui';
import { ProductFallback } from '@/widgets/product/ui';
import { ParamsSchema, SearchParamsSchema } from './params';
import { FeedbackCreateSection } from './sections/feedback-create-section';
import { FeedbacksListSection } from './sections/feedbacks-section';
import { ProductSection } from './sections/product-section';

export default async function Page({ params, searchParams }: PageProps<'/products/[productId]'>) {
  const { productId } = await ParamsSchema.parseAsync(await params);
  const options = await SearchParamsSchema.parseAsync(await searchParams);

  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<ProductFallback />}>
        <ProductSection productId={productId} />
      </Suspense>
      <Suspense fallback={<Skeleton className="container h-[320px]" />}>
        <FeedbackCreateSection productId={productId} />
      </Suspense>
      <Suspense fallback={<FeedbacksListFallback />}>
        <FeedbacksListSection productId={productId} options={options} />
      </Suspense>
    </div>
  );
}

export { generateMetadata } from './seo';
