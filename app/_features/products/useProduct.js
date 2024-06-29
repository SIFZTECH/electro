"use client";

import { getProduct, getProductForPublic } from "@/app/_services/apiProducts";
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

export function useProductForPublic(slug) {
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["productForPublic", slug],
    queryFn: () => getProductForPublic(slug),
  });

  return { product, isLoading, error, isError };
}
