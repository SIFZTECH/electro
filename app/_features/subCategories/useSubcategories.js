"use client";

import { getAllSubcategories } from "@/app/_services/apiSubcategories";
import { useQuery } from "@tanstack/react-query";

export function useSubcategories(page = 1) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["subcategories", { page }],
    queryFn: () => getAllSubcategories(page),
  });

  return { data, isLoading, error, isError };
}
