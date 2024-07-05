import { getAllStorelocations, getAllStores } from "@/app/_services/apiStores";
import { useQuery } from "@tanstack/react-query";

export function useStores(page = 1, query) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["stores", { page, query }],
    queryFn: () => getAllStores(page, query),
  });

  return { data, isLoading, error, isError, total_num: data?.total };
}
export function useStorelocations() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["storelocations"],
    queryFn: () => getAllStorelocations(),
  });

  return { data, isLoading, error, isError };
}
