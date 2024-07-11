import { Skeleton } from "@/app/components/ui/skeleton";

export function SkeletonNavigation() {
  return (
    <div className="flex flex-col space-y-3 basis-[20%]">
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
}
