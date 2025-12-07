'use client';
import { AlertCircleIcon, RefreshCcwIcon } from 'lucide-react';

import type { Err } from '@/shared/lib/result';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/shared/ui/card';

export function ErrorComponent({ error }: { error: Error | Err['error']; title?: string }) {
  return (
    <Card className="container m-4 border-destructive bg-destructive/10">
      <CardContent className="flex gap-4 p-8">
        <div className="flex-0">
          <AlertCircleIcon size={64} />
        </div>
        <div>
          <CardTitle>Unexpected error while loading page!</CardTitle>
          <CardDescription className="text-lg">{error.message}</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button className="flex gap-2" variant="destructive" onClick={() => location.reload()}>
          <RefreshCcwIcon size={16} /> Reload
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ErrorComponentPage() {
  return <ErrorComponent error={new Error('Something got wrong. Try again later.')} />;
}
