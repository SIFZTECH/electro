"use client";

import {
  getAllWarranties,
  getAllWarrantiesForAdmin,
  getWarrantyStats,
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

export function useWarrantyStats() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["warranty-stats"],
    queryFn: () => getWarrantyStats(),
  });

  return { data, isLoading, error, isError };
}
