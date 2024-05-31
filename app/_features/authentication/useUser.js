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
    isVerified: user?.email_verified_at,
    isTwoAuthEnable: user?.isTwoFactorEnable === 1,
  };
}
