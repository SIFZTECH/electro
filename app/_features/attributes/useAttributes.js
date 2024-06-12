"use client";

import {
  getAllAttributeNames,
  getAllAttributes,
} from "@/app/_services/apiAttributes";
import { useQuery } from "@tanstack/react-query";

export function useAttributes() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["attributes"],
    queryFn: getAllAttributes,
  });

  return { data, isLoading, error, isError };
}
export function useAttributeNames() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["attribute-names"],
    queryFn: () => getAllAttributeNames(),
  });

  return { data, isLoading, error, isError };
}
