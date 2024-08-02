"use client";

import {
  getAllProducts,
  getAllProductsForPublic,
  getAllProductsForStocks,
} from "@/app/_services/apiProducts";
import { useQuery } from "@tanstack/react-query";

export function useProducts(
  categoryId,
  brandId,
  page,
  query,
  status,
  sort,
  misc13
) {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "products",
      { categoryId, brandId, page, query, status, sort, misc13 },
    ],
    queryFn: () =>
      getAllProducts({
        categoryId,
        brandId,
        page,
        query,
        status,
        sort,
        misc13,
      }),
  });

  return { products, isError, isLoading, error };
}

export function useProductsForStocks() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["stocks_p"],
    queryFn: () => getAllProductsForStocks(),
  });

  return { products, isError, isLoading, error };
}

export function useProductsForPublic(
  categoryId,
  brandId,
  page,
  query,
  sort,
  misc13
) {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "productsForPublic",
      { categoryId, brandId, page, query, sort, misc13 },
    ],
    queryFn: () =>
      getAllProductsForPublic({
        categoryId,
        brandId,
        page,
        query,
        sort,
        misc13,
      }),
  });

  return { products, isError, isLoading, error };
}
