"use client";

import { resendEmail } from "@/app/_services/apiAuth";
import Logo from "@/app/components/_root_ui/Logo";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Confirmation = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm();

  async function onSubmit() {
    try {
      const res = await resendEmail();

      if (res) {
        toast.success(res.message);
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
          <h2 className="font-serif mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
            Verify your Email address
          </h2>
        </div>

        <div className="mt-8  sm:mx-auto sm:w-full sm:max-w-sm text-center flex flex-col items-center">
          <span className="text-[#191402] font-semibold mb-2 font-serif">
            We have sent email to you
          </span>
          <p>If you didn&apos;t get any email. Please check your junk mails.</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="text-sm">Did&apos;t get email? </span>
            <button
              type="submit"
              disabled={isSubmitSuccessful}
              className="font-medium mt-4 text-[14px] text-color-primary hover:underline cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Resending..." : "Resend"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
