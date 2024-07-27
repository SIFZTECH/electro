"use client";

import {
  getAllProducts,
  getAllProductsForPublic,
} from "@/app/_services/apiProducts";
import { useQuery } from "@tanstack/react-query";

export function useProducts(categoryId, brandId, page, query, status, sort) {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", { categoryId, brandId, page, query, status, sort }],
    queryFn: () =>
      getAllProducts({ categoryId, brandId, page, query, status, sort }),
  });

  return { products, isError, isLoading, error };
}

export function useProductsForPublic(categoryId, brandId, page, query, sort) {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["productsForPublic", { categoryId, brandId, page, query, sort }],
    queryFn: () =>
      getAllProductsForPublic({ categoryId, brandId, page, query, sort }),
  });

  return { products, isError, isLoading, error };
}
