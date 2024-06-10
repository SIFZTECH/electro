"use client";

import { getAllRoles } from "@/app/_services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export function useRoles() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["roles"],
    queryFn: () => getAllRoles(),
  });

  return { data, isLoading, error, isError, permissions: data?.data.permissions, total_num: data?.data?.total };
}
