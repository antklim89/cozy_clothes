import { Skeleton, SkeletonText } from '@/components/ui/skeleton';

const AboutLoading = () => {
  return (
    <div className="container my-8 space-y-4">
      <Skeleton className="w-[200px] h-[60px]" />
      <div>
        <SkeletonText number={20} />
      </div>
      <Skeleton className="w-full h-[200px]" />
      <div>
        <SkeletonText number={4} />
      </div>
      <div className="grid gap-0 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => i).map((i) => (
          <div key={i}>
            <SkeletonText number={4} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default AboutLoading;
