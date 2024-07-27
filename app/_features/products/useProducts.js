"use client";

import {
  getAllProducts,
  getAllProductsForPublic,
} from "@/app/_services/apiProducts";
import { useQuery } from "@tanstack/react-query";

export function useProducts(categoryId, brandId, page, query, status) {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", { categoryId, brandId, page, query, status }],
    queryFn: () => getAllProducts({ categoryId, brandId, page, query, status }),
  });

  return { products, isError, isLoading, error };
}

export function useProductsForPublic(categoryId, brandId, page, query) {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["productsForPublic", { categoryId, brandId, page, query }],
    queryFn: () =>
      getAllProductsForPublic({ categoryId, brandId, page, query }),
  });

  return { products, isError, isLoading, error };
}
