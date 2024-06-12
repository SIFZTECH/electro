"use client";

import { getAllProducts } from "@/app/_services/apiProducts";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return { products, isError, isLoading, error };
}
