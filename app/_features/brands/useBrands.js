"use client";

import { getAllBrands } from "@/app/_services/apiBrand";
import { useQuery } from "@tanstack/react-query";

export function useBrands() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });

  return { data, isLoading, error, isError };
}
