"use client";

import { useUser } from "@/app/_features/authentication/useUser";
import toast from "react-hot-toast";
import { resendOtp } from "@/app/_services/apiAuth";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useTimer } from "@gabrielyotoo/react-use-timer";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import { useState, useEffect } from "react";
// import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";

const ResendOtp = () => {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedChannel =
        localStorage.getItem("channel") &&
        JSON.parse(localStorage.getItem("channel"));
      setChannel(storedChannel);
    }
  }, []);

  const params = useSearchParams();

  const { currentTime, isRunning, start } = useTimer(120);

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: params.get("email"),
      channel: channel?.number ? "number" : "email",
    },
  });

  async function onSubmit({ email, channel }) {
    console.log(email, channel);

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
      console.error(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 text-center">
      <div className="text-center">
        {channel && channel?.number && channel?.email && (
          <>
            <h2 className="font-semibold font-serif mt-2">
              Did't get your OTP?
            </h2>
            <p className="text-muted-foreground text-sm">
              Choose where you want to get your OTP.
            </p>

            <ToggleGroup
              type="single"
              className="mt-2 flex flex-wrap gap-2"
              onValueChange={(value) => setValue("channel", value)}
            >
              <ToggleGroupItem
                value="number"
                className="font-medium text-muted-foreground hover:underline hover:bg-transparent text-[15px] data-[state='on']:!bg-transparent data-[state='on']:!underline data-[state='on']:!text-[#FFB500] p-0"
              >
                {channel.number}
              </ToggleGroupItem>
              <ToggleGroupItem
                value="email"
                className="font-medium text-muted-foreground hover:underline hover:bg-transparent text-[15px] data-[state='on']:!bg-transparent data-[state='on']:!underline data-[state='on']:!text-[#FFB500] p-0"
              >
                {channel.email}
              </ToggleGroupItem>
            </ToggleGroup>
          </>
        )}
      </div>
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
            className="underline text-[#FFB500] font-semibold"
          >
            {isSubmitting ? <SpinnerMini /> : "Resend"}
          </button>
        )}
      </p>
    </form>
  );
};

export default ResendOtp;
