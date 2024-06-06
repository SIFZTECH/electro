"use client";

import { useUser } from "@/app/_features/authentication/useUser";
import { useToast } from "@/app/_hooks/use-toast";
import { resendOtp } from "@/app/_services/apiAuth";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useTimer } from "@gabrielyotoo/react-use-timer";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

const ResendOtp = () => {
  const channel =
    localStorage.getItem("channel") &&
    JSON.parse(localStorage.getItem("channel"));

  console.log(channel);

  const params = useSearchParams();
  const { toast } = useToast();
  const { user, isTwoAuthEnable, isLoading } = useUser();

  const { currentTime, isRunning } = useTimer(5, {
    autoStart: true,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: params.get("email"),
      channel: channel.number ? "number" : "email",
    },
  });

  async function onSubmit({ email, channel }) {
    try {
      const res = await resendOtp({
        channel,
        email,
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
