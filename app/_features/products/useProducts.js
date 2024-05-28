"use client";

import { getAllProducts } from "@/app/_services/apiProducts";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return { products, isLoading, error };
}
