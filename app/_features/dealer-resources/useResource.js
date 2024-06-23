import { getResource } from "@/app/_services/apiResources";
import { useQuery } from "@tanstack/react-query";

export function useResource(id) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["folder", id],
    queryFn: () => getResource(id),
  });

  return { data, isLoading, error, isError };
}
