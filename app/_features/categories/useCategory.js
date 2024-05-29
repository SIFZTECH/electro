"use client";

import { getAllCategories } from "@/app/_services/apiCategories";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const {
    data: categories,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  return { categories, isLoading, error, isError };
}
