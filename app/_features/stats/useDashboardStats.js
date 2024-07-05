import { getDashboardStats } from "@/app/_services/apiDashboard";
import { useQuery } from "@tanstack/react-query";

export function useDashboardStats() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => getDashboardStats(),
  });

  return { data, isLoading, error, isError };
}
