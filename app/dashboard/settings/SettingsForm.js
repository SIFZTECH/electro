"use client";

import { useUser } from "@/app/_features/authentication/useUser";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useForm } from "react-hook-form";

const SettingsForm = () => {
  const { user, isLoading } = useUser();
  console.log(user);
  const {
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      firstName: user ? user.name : "",
      email: user ? user.email : "",
    },
  });

  return (
    <form className="md:py-8 p-2 md:px-6 ">
      <div className="flex flex-wrap flex-col md:flex-row gap-x-9 gap-y-6">
        <div className="md:basis-[45%]">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
            First Name
          </label>
          <div className="mt-1">
            <input
              {...register("firstName")}
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
              {...register("lastName")}
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
          <label
            htmlFor="abn-select"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            ABN
          </label>
          <select
            name="abn"
            id="abn-select"
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
          <select
            {...register("purchase_date", {
              required: "This field must be filled",
            })}
            className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
          >
            <option value="">--Please choose an option--</option>
            <option value="abn">ABN</option>
            <option value="abn">TV5</option>
          </select>
        </div>
        <div className="md:basis-[45%]">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
            Invoice Number
          </label>
          <div className="mt-1">
            <input
              {...register("invoice_number")}
              type="number"
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
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary mt-5 font-semibold rounded-sm px-6 py-2"
      >
        {isSubmitting ? <SpinnerMini /> : "Save"}
      </button>
    </form>
  );
};

export default SettingsForm;
