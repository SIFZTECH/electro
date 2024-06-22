"use client";

import {
  getAllResources,
  getAllResourcesForAdmin,
} from "@/app/_services/apiResources";
import { useQuery } from "@tanstack/react-query";

export function useDealerResources(page) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["resources", { page }],
    queryFn: () => getAllResourcesForAdmin(page),
  });

  return { data, isLoading, error, isError };
}
