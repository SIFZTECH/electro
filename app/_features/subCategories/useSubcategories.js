"use client";

import { getAllSubcategories } from "@/app/_services/apiSubcategories";
import { useQuery } from "@tanstack/react-query";

export function useSubcategories() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["subcategories"],
    queryFn: () => getAllSubcategories(),
  });

  return { data, isLoading, error, isError };
}
