"use client";

import {
  getAllFeatures,
  getAllFeaturesForSelect,
} from "@/app/_services/apiFeatures";

import { useQuery } from "@tanstack/react-query";

export function useFeatures(page) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["key_features", { page }],
    queryFn: () => getAllFeatures(page),
  });

  return { data, isLoading, error, isError };
}

export function useFeaturesForSelect() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["option-features"],
    queryFn: () => getAllFeaturesForSelect(),
  });

  return { data, isLoading, error, isError };
}
