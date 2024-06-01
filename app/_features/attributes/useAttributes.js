"use client";

import { getAllAttributes } from "@/app/_services/apiAttributes";
import { useQuery } from "@tanstack/react-query";

export function useAttributes() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["attributes"],
    queryFn: () => getAllAttributes(),
  });

  return { data, isLoading, error, isError };
}
