"use client";

import {
  getAllMediasForWithChilds,
  getAllSocialMediaAssets,
} from "@/app/_services/apiMedia";
import { useQuery } from "@tanstack/react-query";

export function useSocialMediaResources(page, query) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["social_assets", { page, query }],
    queryFn: () => getAllSocialMediaAssets(page, query),
  });

  return { data, isLoading, error, isError };
}

export function useMediasForAll() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["media-all"],
    queryFn: () => getAllMediasForWithChilds(),
  });

  return { data, isLoading, error, isError };
}
