"use client";

import { getProduct } from "@/app/_services/apiProducts";
import { useQuery } from "@tanstack/react-query";

export function useProduct(slug) {
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProduct(slug),
  });

  return { product, isLoading, error, isError };
}
