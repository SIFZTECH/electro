"use client";

import { getAllresources } from "@/app/_services/apiResources";
import { useQuery } from "@tanstack/react-query";

export function useDealerResources() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["resources"],
    queryFn: () => getAllresources(),
  });

  return { data, isLoading, error, isError };
}
