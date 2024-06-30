"use client";

import {
  getAllCategories,
  getAllCategoriesForPublic,
  getCategory,
} from "@/app/_services/apiCategories";
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
export function useCategoriesForPublic() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["categories-for-public"],
    queryFn: () => getAllCategoriesForPublic(),
  });

  return { data, isLoading, error, isError };
}
