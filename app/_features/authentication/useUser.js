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
    isAdmin: user?.roles[0]?.name === "admin",
    isDealer: user?.roles[0]?.name === "dealer",
    isDealer: user?.roles[0]?.name === "customer",
    isVerified: user?.email_verified_at,
    isTwoAuthEnable: user?.isTwoFactorEnable === 1,
    isBlocked: user?.is_blocked === 1,
  };
}
