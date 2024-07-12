"use client";

import toast from "react-hot-toast";
import { resendOtp } from "@/app/_services/apiAuth";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useTimer } from "@gabrielyotoo/react-use-timer";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";

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
    formState: { isSubmitting, isSubmitSuccessful },
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
      <div className="text-center"></div>
      <p className="text-sm font-serif">
        {isRunning && (
          <>
            Resend Otp in <span>{currentTime}s</span>
          </>
        )}
        <br />
        {!isRunning && channel && channel?.number && channel?.email ? (
          <Dialog>
            <DialogTrigger>
              <span className="text-color-primary hover:text-color-primary/80">
                Resend OTP
              </span>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-start">
              <h2 className="font-semibold font-serif mt-2">
                Where you want to resend your OTP?
              </h2>
              <p className="text-muted-foreground text-sm">
                Choose where you want to get your OTP.
              </p>

              <ToggleGroup
                type="single"
                className="mt-2 flex flex-col items-start text-center gap-4 text-sm font-medium"
                onValueChange={(value) => setValue("channel", value)}
              >
                <ToggleGroupItem
                  value="number"
                  className="data-[state='on']:after:content-['✓'] data-[state='on']:after:ml-3 data-[state='on']:after:text-color-primary data-[state='on']:after:font-bold"
                >
                  Phone: {channel.number}
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="email"
                  className="data-[state='on']:after:content-['✓'] data-[state='on']:after:ml-3 data-[state='on']:after:text-color-primary data-[state='on']:after:font-bold"
                >
                  Email: {channel.email}
                </ToggleGroupItem>
              </ToggleGroup>

              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="btn-primary text-sm font-medium"
              >
                {isSubmitting ? <SpinnerMini /> : "Resend"}
              </button>
            </DialogContent>
          </Dialog>
        ) : (
          <button
            type="submit"
            disabled={isSubmitSuccessful}
            className="mx-2 text-color-primary text-sm font-medium disabled:cursor-not-allowed"
          >
            {isSubmitting ? <SpinnerMini /> : "Resend"}
          </button>
        )}
      </p>
    </form>
  );
};

export default ResendOtp;
