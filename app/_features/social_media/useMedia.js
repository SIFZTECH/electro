"use client";

import { getAllMedia } from "@/app/_services/apiMedia";
import { useQuery } from "@tanstack/react-query";

export function useMedia(page) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["media", { page }],
    queryFn: () => getAllMedia(page),
  });

  return { data, isLoading, error, isError };
}
