"use client";

import { getAllEvents } from "@/app/_services/apiEvents";
import { useQuery } from "@tanstack/react-query";

export function useEvents() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["events"],
    queryFn: () => getAllEvents(),
  });

  return { data, isLoading, error, isError };
}
