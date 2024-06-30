"use client";

import { useState } from "react"; // Import useState hook
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Logo from "../components/ui/Logo";
import SpinnerMini from "../components/ui/SpinnerMini";
import Link from "next/link";
import { login } from "../_services/apiAuth";
import toast from "react-hot-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

export default function Login() {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle state
  };

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isLoading },
  } = useForm();

  async function onSubmit({ email, password }) {
    try {
      const res = await login({ email, password });

      if (res.message && res.data?.available_otp_channel) {
        router.replace(`/otp/verify?email=${email}`);
        localStorage.setItem(
          "channel",
          JSON.stringify(res.data?.available_otp_channel)
        );
      } else {
        localStorage.setItem("access-token", res.data.auth);
        queryClient.invalidateQueries("user");
        router.replace("/dashboard");
      }
      toast.success(res.message);
    } catch (err) {
      console.error(err);
      if (err.response) {
        err.response.data.data
          ? toast.error(err.response.data.data.email)
          : toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  }

  return (
    <>
      <div className="flex items-center min-h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:w-[34rem] sm:py-8 mx-auto sm:border sm:border-gray-200 sm:shadow-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
            <Image src={"/logo.svg"} height={40} width={40} alt="Logo" />
            <h2 className="font-serif mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
              Sign in to your account
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
                    disabled={isLoading}
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {errors?.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-[13px]">
                    <Link
                      href="/password/forgot"
                      className="font-semibold text-color-primary hover:text-color-primary/60"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2 relative">
                  <input
                    {...register("password", {
                      required: "Please enter your password",
                      minLength: {
                        value: 8,
                        message: "Password needs a minimum of 8 characters",
                      },
                    })}
                    disabled={isLoading}
                    type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                    className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  <span
                    onClick={togglePasswordVisibility} // Toggle password visibility on click
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </span>
                </div>
                {errors?.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="font-serif flex w-full justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
                >
                  {isLoading ? <SpinnerMini /> : "Sign in"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <a
                href="/register"
                className="font-semibold leading-6 text-color-primary hover:text-color-primary/70"
              >
                &nbsp; Create new account
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
