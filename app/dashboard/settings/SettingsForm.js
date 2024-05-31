"use client";

import { useUser } from "@/app/_features/authentication/useUser";
import { useToast } from "@/app/_hooks/use-toast";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { Switch } from "@/app/components/ui/switch";
import { BASE_URL } from "@/app/lib/utils";
import axios from "axios";
import { useForm } from "react-hook-form";
import EnableTFAForm from "./EnableTFAForm";
import { useState } from "react";
import { logout, profileSettings } from "@/app/_services/apiAuth";
import { useRouter } from "next/navigation";
import Logout from "./Logout";
import ChangePasswordForm from "./ChangePasswordForm";

const SettingsForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isLoading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      firstname: user ? user.name : "",
      email: user ? user.email : "",
      lastname: user ? user.lastname : "",
      phone: user ? user.phone : "",
      company_name: user ? user.company_name : "",
      weburl: user ? user.weburl : "",
      abn: user ? user.abn : "",
      purchase_date: user ? user.purchase_date : "",
      invoice_number: user ? user.invoice_number : "",
      description: user ? user.description : "",
      street_address: user ? user.street_address : "",
      description: user ? user.description : "",
      city: user ? user.city : "",
      postal_code: user ? user.postal_code : "",
      state: user ? user.state : "",
      logo: user ? user.logo : "",
      stockfeedurl: user ? user.stockfeedurl : "",
    },
  });

  async function onSubmit({
    firstname,
    lastname,
    phone,
    company_name,
    weburl,
    abn,
    purchase_date,
    invoice_number,
    description,
    street_address,
    city,
    postal_code,
    state,
    logo,
    stockfeedurl,
  }) {
    try {
      const res = await profileSettings({
        user_id: user.id,
        firstname,
        lastname,
        phone,
        company_name,
        weburl,
        abn,
        purchase_date,
        invoice_number,
        description,
        street_address,
        city,
        postal_code,
        state,
        logo,
        stockfeedurl,
      });

      console.log(data);

      if (data) {
        toast({
          variant: "success",
          title: data.message,
          duration: 1000,
        });
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast({
          variant: "destructive",
          title: err.response.data.message,
          duration: 1000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          duration: 1000,
        });
      }
    }
  }

  async function handleLogout() {
    try {
      const res = await logout();

      if (res) {
        toast({
          variant: "success",
          title: res.message,
          duration: 1000,
        });

        localStorage.removeItem("access-token");
        router.refresh();
      }
    } catch (err) {
      if (err.response) {
        toast({
          variant: "destructive",
          title: err.response.data.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
        });
      }
    }
  }

  return (
    <>
      <form className="md:py-8 p-2 md:px-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap flex-col md:flex-row gap-x-9 gap-y-6">
          <div className="md:basis-[45%]">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              First Name
            </label>
            <div className="mt-1">
              <input
                {...register("firstname")}
                type="text"
                placeholder="First Name"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="md:basis-[45%]">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Last Name
            </label>
            <div className="mt-1">
              <input
                {...register("lastname")}
                type="text"
                placeholder="Last Name"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="md:basis-[45%]">
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
          <div className="md:basis-[45%]">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Phone Number
            </label>
            <div className="mt-1">
              <input
                {...register("phone")}
                type="tel"
                placeholder="Phone Number"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="md:basis-[45%]">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Company Name
            </label>
            <div className="mt-1">
              <input
                {...register("company_name")}
                type="text"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="md:basis-[45%]">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Web Url
            </label>
            <div className="mt-1">
              <input
                {...register("weburl")}
                type="url"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="md:basis-[45%]">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              ABN
            </label>
            <select
              name="abn"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            >
              <option value="">--Please choose an option--</option>
              <option value="abn">ABN</option>
              <option value="abn">TV5</option>
            </select>
          </div>
          <div className="md:basis-[45%]">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Purchase Date
            </label>
            <input
              {...register("purchase_date")}
              type="date"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="md:basis-[45%]">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Invoice Number
            </label>
            <div className="mt-1">
              <input
                {...register("invoice_number")}
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="md:basis-[45%]">
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
          <div className="md:basis-[45%]">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Street Address
            </label>
            <div className="mt-1">
              <input
                {...register("street_address")}
                type="text"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="md:basis-[45%]">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              City
            </label>
            <div className="mt-1">
              <input
                {...register("city")}
                type="text"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="md:basis-[45%]">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Postal Code
            </label>
            <div className="mt-1">
              <input
                {...register("postal_code")}
                type="text"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="md:basis-[45%]">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              State
            </label>
            <div className="mt-1">
              <input
                {...register("state")}
                type="text"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="md:basis-[45%]">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Upload your logo
            </label>
            <div className="mt-1">
              <input
                {...register("logo")}
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
          <div className="md:basis-[45%]">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Stock in Stock feed url
            </label>
            <div className="mt-1">
              <input
                {...register("stockfeedurl")}
                type="url"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="md:basis-[45%] ">
            <div className="flex gap-3 items-center">
              <div className="mt-1">
                <Switch
                  id="tfa"
                  checked={user?.isTwoFactorEnable === 1 ? true : false}
                  onClick={() => {
                    router.push("/dashboard/settings/enable-2FA");
                  }}
                />
              </div>
              <label
                htmlFor="tfa"
                className="block text-sm font-semibold font-serif leading-6 text-gray-900"
              >
                Enable Two-Factor Authentication
              </label>
            </div>
            <div className="mt-4 flex">
              <label
                className="block text-sm font-semibold font-serif leading-6 text-gray-900 border border-color-primary px-3 py-1 rounded-sm bg-[#fde68a]"
                onClick={() =>
                  router.push("/dashboard/settings/change-password")
                }
              >
                Change your password
              </label>
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

      <div className="px-5">
        <Logout handleLogout={handleLogout} />
      </div>
    </>
  );
};

export default SettingsForm;
