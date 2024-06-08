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

export function useWarrantiesForAdmin() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["warranties"],
    queryFn: () => getAllWarrantiesForAdmin(),
  });

  return { data, isLoading, error, isError };
}
