"use client";

import { useUser } from "@/app/_features/authentication/useUser";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useForm } from "react-hook-form";
import { profileSettingsForNonDealer } from "@/app/_services/apiAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ChangePasswordForm from "./ChangePasswordForm";
import { handleValidationError } from "@/app/_hooks/useHandleValidationError";
import { useQueryClient } from "@tanstack/react-query";

const SettingsFormForNonDealer = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isTwoAuthEnable } = useUser();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      firstname: user.firstname || "",
      email: user.email || "",
      lastname: user.lastname || "",
      logo: user.logo || "",
    },
  });

  async function onSubmit({ firstname, lastname, profile }) {
    try {
      const res = await profileSettingsForNonDealer({
        firstname,
        lastname,
        profile,
      });

      console.log(res);
      if (res) {
        toast.success("Profile updated Successfully");
        queryClient.invalidateQueries("user");
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        err.response?.data?.data
          ? handleValidationError(err.response.data.data)
          : toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <>
      <h1 className="md:px-6 font-serif text-2xl font-semibold">
        Profile Settings
      </h1>
      <form className="md:py-8 p-2 md:px-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-x-9 gap-y-6">
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              First Name
            </label>
            <div className="mt-1">
              <input
                {...register("firstname", {
                  required: "This is required field",
                })}
                type="text"
                placeholder="First Name"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.firstname && (
                <span className="text-red-500 text-sm">
                  {errors.firstname.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Last Name
            </label>
            <div className="mt-1">
              <input
                {...register("lastname", {
                  required: "This is required field",
                })}
                type="text"
                placeholder="Last Name"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.lastname && (
                <span className="text-red-500 text-sm">
                  {errors.lastname.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-1">
              <input
                {...register("email")}
                type="email"
                readOnly
                placeholder="Your Email"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Upload your logo
            </label>
            <div className="mt-1">
              <input
                {...register("profile")}
                type="file"
                placeholder="Upload"
                accept="image/*"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-color-primary/20 file:text-color-gray-200
              hover:file:bg-color-primary/30"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary mt-5 font-semibold rounded-sm px-6 py-2"
        >
          {isSubmitting ? <SpinnerMini /> : "Save"}
        </button>
      </form>
      <div className="md:py-8 p-2 md:px-6">
        <div className="flex gap-3 items-center">
          {isTwoAuthEnable ? (
            <label
              htmlFor="tfa"
              className="btn-primary bg-zinc-300 cursor-pointer text-sm font-semibold font-serif leading-6 text-gray-900"
              onClick={() => {
                router.push("/dashboard/settings/enable-2FA");
              }}
            >
              Disable Two-Factor Authentication
            </label>
          ) : (
            <label
              htmlFor="tfa"
              className="btn-primary bg-emerald-200 cursor-pointer text-sm font-semibold font-serif leading-6 text-gray-900"
              onClick={() => {
                router.push("/dashboard/settings/enable-2FA");
              }}
            >
              Enable Two-Factor Authentication
            </label>
          )}
        </div>
        <div className="mt-4 flex">
          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
};

export default SettingsFormForNonDealer;
