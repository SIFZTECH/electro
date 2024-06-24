"use client";

import { getAllAdminUsers } from "@/app/_services/apiAuth";
import { getAllUsers, getUsersAll } from "@/app/_services/apiUsers";
import { useQuery } from "@tanstack/react-query";

export function useUsers(page = 1, block, query) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["users", { page, block, query }],
    queryFn: () => getAllUsers(page, block, query),
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

export function useAllUsers() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["all-users"],
    queryFn: () => getUsersAll(),
  });

  return { data, isLoading, error, isError, total_num: data?.data?.total };
}
