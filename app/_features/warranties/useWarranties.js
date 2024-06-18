"use client";

import {
  getAllWarranties,
  getAllWarrantiesForAdmin,
} from "@/app/_services/apiWarranties";
import { useQuery } from "@tanstack/react-query";

export function useWarranties() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["warranties"],
    queryFn: () => getAllWarranties(),
  });

  return { data, isLoading, error, isError };
}

export function useWarrantiesForAdmin(page) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["warranties", { page }],
    queryFn: () => getAllWarrantiesForAdmin(page),
  });

  return { data, isLoading, error, isError };
}
