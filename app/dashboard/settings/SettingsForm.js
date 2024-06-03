"use client";

import { useUser } from "@/app/_features/authentication/useUser";
import { useToast } from "@/app/_hooks/use-toast";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { Switch } from "@/app/components/ui/switch";
import { useForm } from "react-hook-form";
import { logout, profileSettings } from "@/app/_services/apiAuth";
import { useRouter } from "next/navigation";
import Logout from "./Logout";

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
      firstname: user?.dealer?.firstname ? user?.dealer?.firstname : "",
      email: user ? user.email : "",
      lastname: user.dealer?.lastname ? user.dealer?.lastname : "",
      phone: user.dealer?.phone ? user.dealer?.phone : "",
      company_name: user.dealer?.company_name ? user.dealer?.company_name : "",
      weburl: user.dealer?.weburl ? user.dealer?.weburl : "",
      abn: user.dealer?.abn ? user.dealer?.abn : "",
      purchase_date: user.dealer?.purchase_date
        ? user.dealer?.purchase_date
        : "",
      invoice_number: user.dealer?.invoice_number
        ? user.dealer?.invoice_number
        : "",
      description: user.dealer?.description ? user.dealer?.description : "",
      street_address: user.dealer?.street_address
        ? user.dealer?.street_address
        : "",
      description: user.dealer?.description ? user.dealer?.description : "",
      city: user.dealer?.city ? user.dealer?.city : "",
      postal_code: user.dealer?.postal_code ? user.dealer?.postal_code : "",
      state: user.dealer?.state ? user.dealer?.state : "",
      logo: user.dealer?.logo ? user.dealer?.logo : "",
      stockfeedurl: user.dealer?.stockfeedurl ? user.dealer?.stockfeedurl : "",
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

      if (res) {
        toast({
          variant: "success",
          title: res.message,
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

  return (
    <>
      <form className="md:py-8 p-2 md:px-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap flex-col md:flex-row gap-x-9 gap-y-6">
          <div className="md:basis-[45%]">
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
          <div className="md:basis-[45%]">
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

          <div className="md:basis-[45%]">
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
          <div className="md:basis-[45%]">
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
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Purchase Date
            </label>
            <input
              {...register("purchase_date", {
                required: "Please pick your purchase date",
              })}
              type="date"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.purchase_date && (
              <span className="text-red-500 text-sm">
                {errors.purchase_date.message}
              </span>
            )}
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
              <label
                htmlFor="tfa"
                className="btn-primary cursor-pointer text-sm font-semibold font-serif leading-6 text-gray-900"
                onClick={() => {
                  router.push("/dashboard/settings/enable-2FA");
                }}
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
    </>
  );
};

export default SettingsForm;
