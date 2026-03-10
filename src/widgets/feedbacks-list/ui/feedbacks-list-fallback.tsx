import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Item, ItemContent, ItemHeader, ItemTitle } from '@/shared/ui/item';
import { Skeleton } from '@/shared/ui/skeleton';

export function FeedbacksListFallback() {
  return (
    <Item className="container my-8 flex w-full flex-col">
      <ItemHeader className="flex-col items-start">
        <ItemTitle className="text-3xl">
          <Skeleton className="h-8 w-38" />
        </ItemTitle>
        <p>Total feedbacks: ...</p>
      </ItemHeader>

      <ItemContent className="flex w-full gap-4">
        {Array.from({ length: 2 }, (_, idx) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: ok
          <Card className="w-full" key={idx}>
            <CardHeader className="flex flex-col justify-between md:flex-row">
              <div>
                <Skeleton className="mb-4 h-8 w-64" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-8 w-72" />
            </CardHeader>
            <CardContent>
              {Array.from({ length: 12 }, (__, idx2) => (
                /** biome-ignore lint/suspicious/noArrayIndexKey: ok */
                <Skeleton className="mb-2 h-3 w-full" key={idx2} />
              ))}
            </CardContent>
          </Card>
        ))}
      </ItemContent>
    </Item>
  );
}
