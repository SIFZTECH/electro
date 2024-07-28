"use client";

import {
  getAllProducts,
  getAllProductsForPublic,
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
      getAllProductsForPublic({ categoryId, brandId, page, query, sort, misc13 }),
  });

  return { products, isError, isLoading, error };
}
