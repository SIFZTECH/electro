"use client";

import Logo from "@/app/components/_root_ui/Logo";
import { useForm } from "react-hook-form";
import SpinnerMini from "../../components/ui/SpinnerMini";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/app/lib/utils";
import toast from "react-hot-toast";
import Image from "next/image";
export default function ForgotPassword() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");
  const token = params.get("token");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();

  async function onSubmit({ password, password_confirmation }) {
    try {
      const { data } = await axios.post(`${BASE_URL}/user/reset-password`, {
        token,
        email,
        password,
        password_confirmation,
      });

      if (data.status === 200) {
        toast.success(data.message);

        router.replace("/login");
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
    <>
      <div className="flex items-center min-h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:w-[34rem] sm:py-8 mx-auto sm:border sm:border-gray-200 sm:shadow-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
            <Image src={"/logo.jpeg"} height={130} width={130} alt="Logo" />
            <h2 className="font-serif mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
              Reset your password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    New Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    {...register("password", {
                      required: "Please enter your password",
                      minLength: {
                        value: 8,
                        message: "Password needs a minimum of 8 characters",
                      },
                    })}
                    type="password"
                    className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {errors?.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password Confirm
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    {...register("password_confirmation", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === getValues().password ||
                        "Passwords need to match",
                    })}
                    type="password"
                    className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {errors?.passwordConfirm && (
                    <span className="text-red-500 text-sm">
                      {errors.passwordConfirm.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-serif flex w-full justify-center rounded-md bg-color-primary text-white px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary cursor-pointer"
                >
                  {isSubmitting ? <SpinnerMini /> : "Reset password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
