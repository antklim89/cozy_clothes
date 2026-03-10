import { Spinner } from '@/shared/ui/spinner';

function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner className="size-16" />
    </div>
  );
}

export default Loading;
