"use client";

import { getAllSocialMediaAssets } from "@/app/_services/apiMedia";
import { useQuery } from "@tanstack/react-query";

export function useSocialMediaResources(page, query) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["social_assets", { page, query }],
    queryFn: () => getAllSocialMediaAssets(page, query),
  });

  return { data, isLoading, error, isError };
}
