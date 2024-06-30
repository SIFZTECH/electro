"use client";

import { getAllBrands, getAllBrandsForPublic } from "@/app/_services/apiBrand";
import { useQuery } from "@tanstack/react-query";

export function useBrands() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });

  return { data, isLoading, error, isError };
}
export function useBrandsForPublic() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["brands-for-public"],
    queryFn: getAllBrandsForPublic,
  });

  return { data, isLoading, error, isError };
}
