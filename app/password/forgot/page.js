"use client";

import { useForm } from "react-hook-form";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import axios from "axios";
import { BASE_URL } from "@/app/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Logo from "@/app/components/_root_ui/Logo";

export default function ForgotPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();

  async function onSubmit({ email }) {
    try {
      const { data } = await axios.post(`${BASE_URL}/user/forgot-password`, {
        email,
      });

      if (data.status === 200) {
        toast.success(data.message);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast.error(err.response.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <>
      <div className="flex items-center min-h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:w-[34rem] sm:py-8 mx-auto sm:border sm:border-gray-200 sm:shadow-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
            <Logo />
            <h2 className="font-serif mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
              Forgot your password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register("email", {
                      required: "Please provide your email address",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please provide a valid email address",
                      },
                    })}
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {errors?.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="font-serif flex w-full justify-center rounded-md bg-color-primary text-white px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <SpinnerMini /> : "Forgot Password"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Log in with password
              <a
                href="/login"
                className="font-semibold leading-6 text-color-primary hover:text-color-primary/70"
              >
                &nbsp; Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
