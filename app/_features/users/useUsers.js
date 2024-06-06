"use client";

import { getAllUsers } from "@/app/_services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export function useUsers(query) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(query),
  });

  return { data, isLoading, error, isError, total_num: data?.data?.total };
}
