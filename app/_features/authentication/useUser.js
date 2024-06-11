import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/app/_services/apiAuth";

export function useUser() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  if (!isLoading && !isError && !error) {
    var user = data && data[0];
  }

  return {
    isLoading,
    isError,
    error,
    user,
    permissions: user?.roles ? user.roles[0].permissions : [],
    isVerified: user?.email_verified_at,
    isTwoAuthEnable: user?.isTwoFactorEnable === 1,
    isBlocked: user?.is_blocked === 1,
  };
}
