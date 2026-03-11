import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

export function FeedbackItemFallback() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col justify-between md:flex-row">
        <div>
          <Skeleton className="mb-4 h-8 w-64" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-8 w-72" />
      </CardHeader>
      <CardContent>
        {Array.from({ length: 12 }, (__, idx) => (
          /** biome-ignore lint/suspicious/noArrayIndexKey: ok */
          <Skeleton className="mb-2 h-3 w-full" key={idx} />
        ))}
      </CardContent>
    </Card>
  );
}
