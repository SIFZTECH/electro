"use client";

import { getAllBlockedUsers, getAllUsers } from "@/app/_services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export function useUsers(query) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(query),
  });

  return { data, isLoading, error, isError, total_num: data?.data?.total };
}

export function useBlockedUsers() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["blockedUsers"],
    queryFn: () => getAllBlockedUsers(),
  });

  return { data, isLoading, error, isError, total_num: data?.data?.total };
}
