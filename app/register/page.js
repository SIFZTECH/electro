"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import Logo from "@/app/components/ui/Logo";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { BASE_URL } from "../lib/utils";
import { useToast } from "../_hooks/use-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit({ name, email, password, passwordConfirm }) {
    try {
      const { data } = await axios.post(`${BASE_URL}/user/register`, {
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
      });

      if (data) {
        toast({
          variant: "success",
          title: "Account successfully created",
          duration: 1000,
        });

        localStorage.setItem("access-token", data.data.auth);
        router.replace("/register/confirmation");
      }
    } catch (err) {
      console.log(err);
      if (err.response.data.message.email) {
        toast({
          variant: "destructive",
          title: err.response.data.message.email,
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
    <>
      <div className="flex items-center min-h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:w-[34rem] sm:py-8 mx-auto sm:border sm:border-gray-200 sm:shadow-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
            <Logo />
            <h2 className="font-serif mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
              Create new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    {...register("name", {
                      required: "Please provide your name",
                    })}
                    type="text"
                    disabled={isSubmitting}
                    className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {errors?.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </div>
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
                    disabled={isSubmitting}
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
                    disable={isSubmitting}
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
                    {...register("passwordConfirm", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === getValues().password ||
                        "Passwords need to match",
                    })}
                    disabled={isSubmitting}
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
              <div className="text-[13px] font-medium flex items-center gap-1">
                <input type="checkbox" required />
                <span>
                  I accept
                  <a
                    className="text-color-primary hover:text-color-primary/70"
                    href="#"
                  >
                    {" "}
                    Terms and conditions
                  </a>
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  className="font-serif flex w-full justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
                >
                  {isSubmitting ? <SpinnerMini /> : "Sign Up"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?
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
