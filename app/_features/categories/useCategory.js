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
