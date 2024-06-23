"use client";

import { getWarranty } from "@/app/_services/apiWarranties";
import { useQuery } from "@tanstack/react-query";

export function useWarranty(id) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["warranty", id],
    queryFn: () => getWarranty(id),
  });

  return { data, isLoading, error, isError };
}
