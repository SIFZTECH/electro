"use client";

import { getAllOrders, getOrder } from "@/app/_services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export function useOrders(page = 1, query) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["orders", { page, query }],
    queryFn: () => getAllOrders(page, query),
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
