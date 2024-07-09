"use client";

import toast from "react-hot-toast";
import { resendOtp, resendPhoneOtp } from "@/app/_services/apiAuth";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useTimer } from "@gabrielyotoo/react-use-timer";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";

const ResendOtpPhone = () => {
  const { currentTime, isRunning, start } = useTimer(120);

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm({});

  async function onSubmit() {
    try {
      const res = await resendPhoneOtp();
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

export default ResendOtpPhone;
