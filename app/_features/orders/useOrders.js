"use client";

import { getAllOrders, getOrder } from "@/app/_services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export function useOrders(page = 1, query, status) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["orders", { status, page, query }],
    queryFn: () => getAllOrders(page, query, status),
  });

  return { data, isLoading, error, isError, total_num: data?.total };
}

export function useOrder(id) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["order", { id }],
    queryFn: () => getOrder(id),
  });

  return { data, isLoading, error, isError };
}
