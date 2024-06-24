"use client";

import {
  getAllResources,
  getAllResourcesForAdmin,
} from "@/app/_services/apiResources";
import { useQuery } from "@tanstack/react-query";

export function useDealerResources(page, query) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["resources", { page, query }],
    queryFn: () => getAllResourcesForAdmin(page, query),
  });

  return { data, isLoading, error, isError };
}
