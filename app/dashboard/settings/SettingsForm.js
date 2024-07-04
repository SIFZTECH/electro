"use client";

import { useUser } from "@/app/_features/authentication/useUser";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { profileSettings } from "@/app/_services/apiAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ChangePasswordForm from "./ChangePasswordForm";
import { useQueryClient } from "@tanstack/react-query";
import { getCoordinatesFromUrl } from "@/app/lib/utils";
import { useState } from "react";
import { handleValidationError } from "@/app/_hooks/useHandleValidationError";

const SettingsForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isLoading, isTwoAuthEnable } = useUser();
  const [coordinates, setCoordinates] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      firstname: user.firstname || "",
      email: user.email || "",
      lastname: user.lastname || "",
      phone: user.phone || "",
      company_name: user.company_name || "",
      weburl: user.weburl || "",

      description: user.description || "",
      street_address: user.street_address || "",
      description: user.description || "",
      city: user.city || "",
      postal_code: user.postal_code || "",
      state: user.state || "",
      profile: user.profile || "",
    },
  });

  async function onSubmit({
    firstname,
    lastname,
    email,
    phone,
    company_name,
    weburl,

    description,
    street_address,
    city,
    postal_code,
    state,
    profile,
  }) {
    try {
      const res = await profileSettings({
        firstname,
        lastname,
        phone,
        company_name,
        weburl,

        description,
        street_address,
        city,
        postal_code,
        state,
        profile,
      });
      if (res) {
        toast.success(res.message);
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
        Dealer Profile Settings
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
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Phone Number
            </label>
            <div className="mt-1">
              <input
                {...register("phone", {
                  required: "This is required field",
                })}
                type="tel"
                placeholder="Phone Number"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Company Name
            </label>
            <div className="mt-1">
              <input
                {...register("company_name", {
                  required: "This is required field",
                })}
                type="text"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.company_name && (
                <span className="text-red-500 text-sm">
                  {errors.company_name.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Web Url
            </label>
            <div className="mt-1">
              <input
                {...register("weburl")}
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-1">
              <textarea
                {...register("description")}
                type="text"
                cols="45"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Street Address
            </label>
            <div className="mt-1">
              <input
                {...register("street_address", {
                  required: "This is required field",
                })}
                type="text"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.street_address && (
                <span className="text-red-500 text-sm">
                  {errors.street_address.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              City
            </label>
            <div className="mt-1">
              <input
                {...register("city", {
                  required: "This is required field",
                })}
                type="text"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.city && (
                <span className="text-red-500 text-sm">
                  {errors.city.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Postal Code
            </label>
            <div className="mt-1">
              <input
                {...register("postal_code", {
                  required: "This is required field",
                })}
                type="text"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.postal_code && (
                <span className="text-red-500 text-sm">
                  {errors.postal_code.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              State
            </label>
            <div className="mt-1">
              <input
                {...register("state", {
                  required: "This is required field",
                })}
                type="text"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.state && (
                <span className="text-red-500 text-sm">
                  {errors.state.message}
                </span>
              )}
            </div>
          </div>

          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Upload your profile picture
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

export default SettingsForm;
