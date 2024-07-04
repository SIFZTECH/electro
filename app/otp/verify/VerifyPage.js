"use client";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";
import Logo from "@/app/components/ui/Logo";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { verifyOtpForLogin } from "@/app/_services/apiAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTimer } from "@gabrielyotoo/react-use-timer";
import ResendOtp from "../RecentOtp";

function InputOTPForm() {
  const router = useRouter();
  const { currentTime, isRunning } = useTimer(120, {
    autoStart: true,
  });

  const form = useForm({
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit({ otp }) {
    try {
      const res = await verifyOtpForLogin(otp);

      if (res.data) {
        localStorage.setItem("access-token", res.data.auth);
        router.replace("/dashboard");

        toast.success("Verified Successfully");
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
    <div className="flex items-center min-h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:w-[34rem] sm:py-8 mx-auto sm:border sm:border-gray-200 sm:shadow-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <Logo />
          <h2 className="font-serif mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-10">
            OTP Verification
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6 text-center"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your device.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button type="submit" className="btn-primary">
                {form.formState.isSubmitting ? <SpinnerMini /> : "Submit"}
              </button>
            </form>
          </Form>
          <ResendOtp />
        </div>
      </div>
    </div>
  );
}

export default InputOTPForm;