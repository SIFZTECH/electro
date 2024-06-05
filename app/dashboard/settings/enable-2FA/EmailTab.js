"use client";

import { useUser } from "@/app/_features/authentication/useUser";
import { useToast } from "@/app/_hooks/use-toast";
import { enableTwoFactorAuth } from "@/app/_services/apiAuth";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const EmailTab = () => {
  const router = useRouter();
  const { isTwoAuthEnable, user } = useUser();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      channel: "email",
    },
  });

  async function onSubmit({ two_fa_email, channel }) {
    try {
      // let res;
      // if (isTwoAuthEnable) {
      //   res = await disbleTwoFactorAuth(password);
      // } else if (user?.isTwoFactorEnable === 0) {
      //   res = await enableTwoFactorAuth({ two_fa_email, channel });
      // }

      const res = await enableTwoFactorAuth({ two_fa_email, channel });

      console.log(res);

      if (res) {
        toast({
          variant: "success",
          title: res.message,
          duration: 1000,
        });

        queryClient.invalidateQueries("user");
        router.replace("/dashboard/settings/enable-2FA/verify");
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast({
          variant: "destructive",
          title: err.response.data.message,
          duration: 1000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          duration: 1000,
        });
      }
    }
  }

  return (
    <>
      {isTwoAuthEnable && user?.channel === "email" ? (
        <div className="flex items-center justify-between">
          <span>{user.two_fa_email}</span>
          <span
            className="btn-primary cursor-pointer bg-gray-200"
            onClick={() => router.push("/dashboard/settings/disable-2FA")}
          >
            Remove
          </span>
        </div>
      ) : (
        <>
          <p>Click enable when you're done.</p>
          <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register("two_fa_email", {
                    required: "Please provide your email address",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please provide a valid email address",
                    },
                  })}
                  disabled={isSubmitting}
                  type="email"
                  className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.two_fa_email && (
                  <span className="text-red-500 text-sm">
                    {errors.two_fa_email.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 font-serif flex justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
              >
                {isSubmitting ? <SpinnerMini /> : "Enable"}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default EmailTab;
