"use client";

import { useUser } from "@/app/_features/authentication/useUser";
import toast from "react-hot-toast";
import { resendOtp } from "@/app/_services/apiAuth";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useTimer } from "@gabrielyotoo/react-use-timer";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

const ResendOtp = () => {
  if (typeof window !== "undefined") {
    var channel =
      localStorage.getItem("channel") &&
      JSON.parse(localStorage.getItem("channel"));
  }

  const params = useSearchParams();
  const { user, isTwoAuthEnable, isLoading } = useUser();

  const { currentTime, isRunning, start } = useTimer(120, {
    autoStart: true,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: params.get("email"),
      channel: channel?.number ? "number" : "email",
    },
  });

  async function onSubmit({ email, channel }) {
    try {
      const res = await resendOtp({
        channel,
        email,
      });
      if (res) {
        toast.success(res.message);
        start();
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          duration: 1000,
        });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <p className="text-sm font-serif">
        {isRunning && (
          <>
            Resend Otp in <span>{currentTime}s</span>
          </>
        )}
        <br />
        {!isRunning && (
          <button
            type="submit"
            className="underline text-[#e1b813] font-semibold"
          >
            {isSubmitting ? <SpinnerMini /> : "Resend"}
          </button>
        )}
      </p>
    </form>
  );
};

export default ResendOtp;
