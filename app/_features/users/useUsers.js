"use client";

import { getAllAdminUsers } from "@/app/_services/apiAuth";
import { getAllBlockedUsers, getAllUsers } from "@/app/_services/apiUsers";
import { useQuery } from "@tanstack/react-query";

export function useUsers(page = 1) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["users", { page }],
    queryFn: () => getAllUsers(page),
  });

  return { data, isLoading, error, isError, total_num: data?.total };
}

export function useAdminUsers() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => getAllAdminUsers(),
  });

  return { data, isLoading, error, isError, total_num: data?.data?.total };
}

export function useBlockedUsers(page = 1) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["blockedUsers", { page }],
    queryFn: () => getAllBlockedUsers(page),
  });

  return { data, isLoading, error, isError, total_num: data?.data?.total };
}
