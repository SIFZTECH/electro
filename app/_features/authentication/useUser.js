import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/app/_services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    user,
    isAdmin: user?.roles[0]?.name === "admin" || false,
    isDealer: user?.roles[0]?.name === "dealer" || false,
  };
}
