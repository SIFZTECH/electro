"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createWarrantyForAnyone } from "@/app/_services/apiWarranties";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import SelectDealer from "./SelectDealer";
import { handleValidationError } from "@/app/_hooks/useHandleValidationError";
import { DatePicker } from "@/app/components/ui/DatePicker";
import moment from "moment";
import Select from "react-select";
import countryList from "react-select-country-list";

const WarrantyRegistrationPage = () => {
  const [date, setDate] = useState(null);
  const [dealer, setDealer] = useState(null);
  const [country, setCountry] = useState(null);
  const options = countryList().getData();

  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      if (!dealer) {
        return toast.error("Purchase from is missing!");
      }

      if (!date) {
        return toast.error("Purchase date is missing!");
      }

      const res = await createWarrantyForAnyone({
        ...data,
        purchase_date: moment(date).format("YYYY-MM-DD"),
        purchase_from: dealer,
        battery_serial_no_image: data.battery_serial_no_image[0],
        motor_serial_no_image: data.motor_serial_no_image[0],
        invoice_image: data.invoice_image[0],
        frame_serial_no_image: data.frame_serial_no_image[0],
        country: country.label, // Add country to the form data
      });

      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("warranties");
        router.back(-1);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        err.response?.data?.message
          ? handleValidationError(err.response?.data?.message)
          : toast.error(err.response.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <div className="w-full py-6">
      <h1 className="heading-h1 text-center">Warranty Registration</h1>
      <form
        className="md:py-8 p-2 md:px-6 max-w-7xl mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="flex items-center gap-2 justify-center my-3 mb-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 3L23 3L23 24L20 22L17 24L14 22L11 24L8 22L5 24L5 3Z"
              stroke="#FFB500"
              strokeWidth="2.4"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
            <path
              d="M9 9L14 9"
              stroke="#FFB500"
              strokeWidth="2.4"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
            <path
              d="M18 9H19"
              stroke="#FFB500"
              strokeWidth="2.4"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
            <path
              d="M9 13L14 13"
              stroke="#FFB500"
              strokeWidth="2.4"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
            <path
              d="M18 13H19"
              stroke="#FFB500"
              strokeWidth="2.4"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
            <path
              d="M9 17H14"
              stroke="#FFB500"
              strokeWidth="2.4"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
            <path
              d="M18 17H19"
              stroke="#FFB500"
              strokeWidth="2.4"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
          </svg>
          <span className="font-semibold font-serif">
            Register your Warranty
          </span>
        </h2>
        <div className="flex flex-col gap-x-9 gap-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-9 gap-y-3">
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                First Name
              </label>
              <div className="mt-1">
                <input
                  {...register("firstname", {
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="First Name"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="Last Name"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.lastname && (
                  <span className="text-red-500 text-sm">
                    {errors.lastname.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Email
              </label>
              <div className="mt-1">
                <input
                  {...register("email", {
                    required: "This field is required",
                  })}
                  type="email"
                  placeholder="Your Email Address"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  {...register("phone", {
                    required: "This field is required",
                  })}
                  type="tel"
                  placeholder="Phone Number"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                Country
              </label>
              <div className="mt-1">
                <Select
                  options={options}
                  value={country}
                  onChange={setCountry}
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.country && (
                  <span className="text-red-500 text-sm">
                    {errors.country.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Address
              </label>
              <div className="mt-1">
                <input
                  {...register("address", {
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="Your Address"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.address && (
                  <span className="text-red-500 text-sm">
                    {errors.address.message}
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
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="City"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                State
              </label>
              <div className="mt-1">
                <input
                  {...register("state", {
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="State"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.state && (
                  <span className="text-red-500 text-sm">
                    {errors.state.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Zip/Postal Code
              </label>
              <div className="mt-1">
                <input
                  {...register("zip", {
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="Zip/Postal Code"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.zip && (
                  <span className="text-red-500 text-sm">
                    {errors.zip.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <h2 className="flex items-center gap-2 justify-center mt-3 mb-6">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3L23 3L23 24L20 22L17 24L14 22L11 24L8 22L5 24L5 3Z"
                stroke="#FFB500"
                strokeWidth="2.4"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
              <path
                d="M9 9L14 9"
                stroke="#FFB500"
                strokeWidth="2.4"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
              <path
                d="M18 9H19"
                stroke="#FFB500"
                strokeWidth="2.4"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
              <path
                d="M9 13L14 13"
                stroke="#FFB500"
                strokeWidth="2.4"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
              <path
                d="M18 13H19"
                stroke="#FFB500"
                strokeWidth="2.4"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
              <path
                d="M9 17H14"
                stroke="#FFB500"
                strokeWidth="2.4"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
              <path
                d="M18 17H19"
                stroke="#FFB500"
                strokeWidth="2.4"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
            </svg>
            <span className="font-semibold font-serif">
              Product Information
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-9 gap-y-3">
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Product Model
              </label>
              <div className="mt-1">
                <input
                  {...register("product_model", {
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="Product Model"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.product_model && (
                  <span className="text-red-500 text-sm">
                    {errors.product_model.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Purchase Date
              </label>
              <div className="mt-1">
                <DatePicker date={date} setDate={setDate} />
                {errors?.purchase_date && (
                  <span className="text-red-500 text-sm">
                    {errors.purchase_date.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Dealer
              </label>
              <div className="mt-1">
                <SelectDealer dealer={dealer} setDealer={setDealer} />
                {errors?.dealer && (
                  <span className="text-red-500 text-sm">
                    {errors.dealer.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Motor Serial Number
              </label>
              <div className="mt-1">
                <input
                  {...register("motor_serial_no", {
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="Motor Serial Number"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.motor_serial_no && (
                  <span className="text-red-500 text-sm">
                    {errors.motor_serial_no.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Motor Serial Number Image
              </label>
              <div className="mt-1">
                <input
                  {...register("motor_serial_no_image", {
                    required: "This field is required",
                  })}
                  type="file"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.motor_serial_no_image && (
                  <span className="text-red-500 text-sm">
                    {errors.motor_serial_no_image.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Battery Serial Number
              </label>
              <div className="mt-1">
                <input
                  {...register("battery_serial_no", {
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="Battery Serial Number"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.battery_serial_no && (
                  <span className="text-red-500 text-sm">
                    {errors.battery_serial_no.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Battery Serial Number Image
              </label>
              <div className="mt-1">
                <input
                  {...register("battery_serial_no_image", {
                    required: "This field is required",
                  })}
                  type="file"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.battery_serial_no_image && (
                  <span className="text-red-500 text-sm">
                    {errors.battery_serial_no_image.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Frame Serial Number
              </label>
              <div className="mt-1">
                <input
                  {...register("frame_serial_no", {
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="Frame Serial Number"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.frame_serial_no && (
                  <span className="text-red-500 text-sm">
                    {errors.frame_serial_no.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Frame Serial Number Image
              </label>
              <div className="mt-1">
                <input
                  {...register("frame_serial_no_image", {
                    required: "This field is required",
                  })}
                  type="file"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.frame_serial_no_image && (
                  <span className="text-red-500 text-sm">
                    {errors.frame_serial_no_image.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Invoice Image
              </label>
              <div className="mt-1">
                <input
                  {...register("invoice_image", {
                    required: "This field is required",
                  })}
                  type="file"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.invoice_image && (
                  <span className="text-red-500 text-sm">
                    {errors.invoice_image.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center w-full rounded-md bg-[#FFB500] py-2.5 px-3 text-center font-semibold text-white shadow-sm hover:bg-[#d68c00] sm:text-sm"
            >
              {isSubmitting ? <SpinnerMini /> : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WarrantyRegistrationPage;
