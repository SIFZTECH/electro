"use client";

import { getAllCategories, getCategory } from "@/app/_services/apiCategories";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useCategories() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  return { data, isLoading, error, isError };
}

export function useCategory() {
  const {
    data: category,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getCategory(categoryId),
  });

  return { category, isLoading, error, isError };
}
