import { getMediaAsset } from "@/app/_services/apiMedia";
import { getResource } from "@/app/_services/apiResources";
import { useQuery } from "@tanstack/react-query";

export function useSocialMediaAsset(id) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["media-folder", id],
    queryFn: () => getMediaAsset(id),
  });

  return { data, isLoading, error, isError };
}
