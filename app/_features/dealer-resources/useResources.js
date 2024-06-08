"use client";

import {
  getAllResources,
  getAllResourcesForAdmin,
} from "@/app/_services/apiResources";
import { useQuery } from "@tanstack/react-query";

export function useDealerResources() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["resources"],
    queryFn: () => getAllResources(),
  });

  return { data, isLoading, error, isError };
}

export function useDealerResourcesForAdmin() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["resources"],
    queryFn: () => getAllResourcesForAdmin(),
  });

  return { data, isLoading, error, isError };
}
