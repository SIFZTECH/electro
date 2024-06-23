"use client";

import { getAllProducts } from "@/app/_services/apiProducts";
import { useQuery } from "@tanstack/react-query";

export function useProducts(categoryId, brandId, page, query) {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", { categoryId, brandId, page, query }],
    queryFn: () => getAllProducts({ categoryId, brandId, page, query }),
  });

  return { products, isError, isLoading, error };
}
