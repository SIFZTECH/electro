"use client";

import { getAllOrders } from "@/app/_services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export function useOrders(page = 1, query) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["orders", { page, query }],
    queryFn: () => getAllOrders(page, query),
  });

  return { data, isLoading, error, isError, total_num: data?.total };
}
