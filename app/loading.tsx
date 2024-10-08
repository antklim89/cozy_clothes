import { Spinner } from '@/components/ui/spinner';


function PageLoading() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Spinner className="size-16" />
    </div>
  );
}

export default PageLoading;
