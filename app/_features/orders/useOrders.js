"use client";

import { getAllOrders } from "@/app/_services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export function useOrders() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  return { data, isLoading, error, isError };
}
