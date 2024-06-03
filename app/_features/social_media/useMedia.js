"use client";

import { getAllMedia } from "@/app/_services/apiMedia";
import { useQuery } from "@tanstack/react-query";

export function useMedia() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["media"],
    queryFn: () => getAllMedia(),
  });

  return { data, isLoading, error, isError };
}
