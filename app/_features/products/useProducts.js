"use client";

import { getAllProducts } from "@/app/_services/apiProducts";
import { useQuery } from "@tanstack/react-query";

export function useProducts(categoryId, brandId, page) {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", { categoryId, brandId, page }],
    queryFn: () => getAllProducts({ categoryId, brandId, page }),
  });

  return { products, isError, isLoading, error };
}
