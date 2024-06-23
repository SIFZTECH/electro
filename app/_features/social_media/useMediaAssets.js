"use client";

import { getAllSocialMediaAssets } from "@/app/_services/apiMedia";
import { useQuery } from "@tanstack/react-query";

export function useSocialMediaResources(page) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["social_assets", { page }],
    queryFn: () => getAllSocialMediaAssets(page),
  });

  return { data, isLoading, error, isError };
}
