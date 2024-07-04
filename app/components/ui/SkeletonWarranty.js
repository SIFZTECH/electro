import { Skeleton } from "./skeleton";

export function SkeletonWarranty() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="space-y-3">
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
      </div>
    </div>
  );
}
