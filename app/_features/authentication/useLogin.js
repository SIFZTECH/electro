import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { login as loginApi } from "@/app/_services/apiAuth";

import { useToast } from "@/app/components/ui/use-toast";
import { duration } from "moment";

export function useLogin() {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      localStorage.setItem("access-token", user.auth);

      toast({
        variant: "success",
        title: "Login successfully",
        duration: 1000,
      });

      router.replace("/dashboard");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast({
        variant: "destructive",
        title: "Provided email or password are incorrect",
        duration: 1000,
      });
    },
  });

  return { login, isPending };
}
