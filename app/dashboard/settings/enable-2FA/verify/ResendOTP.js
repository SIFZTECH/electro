"use client";

import { useUser } from "@/app/_features/authentication/useUser";
import { useToast } from "@/app/_hooks/use-toast";
import { resendOtp } from "@/app/_services/apiAuth";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useTimer } from "@gabrielyotoo/react-use-timer";
import { useForm } from "react-hook-form";

const ResendOtp = () => {
  const { toast } = useToast();
  const { user, isTwoAuthEnable, isLoading } = useUser();

  const { currentTime, isRunning } = useTimer(10, {
    autoStart: true,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  // const option = user?.channel === "email" ? user.two :
  async function onSubmit() {
    try {
      const res = await resendOtp({
        channel: user?.channel,
        email: user?.two_fa_email,
        phone_number: user?.phone_number,
      });

      if (res) {
        toast({
          variant: "success",
          title: res.message,
          duration: 1000,
        });
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
