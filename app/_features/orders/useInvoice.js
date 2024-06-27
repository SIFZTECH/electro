"use client";

import { getAllOrders, getInvoice } from "@/app/_services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export function useInvoice(id) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["invoice", { id }],
    queryFn: () => getInvoice(id),
  });

  return { data, isLoading, error, isError };
}
