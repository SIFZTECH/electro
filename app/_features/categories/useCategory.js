"use client";

import {
  getAllCategories,
  getAllCategoriesForPublic,
  getAllCategoriesForSelect,
} from "@/app/_services/apiCategories";
import { useQuery } from "@tanstack/react-query";

export function useCategories(page) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["categories", { page }],
    queryFn: () => getAllCategories(page),
  });

  return { data, isLoading, error, isError };
}

export function useCategoriesForSelect() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["select-categories"],
    queryFn: () => getAllCategoriesForSelect(),
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
