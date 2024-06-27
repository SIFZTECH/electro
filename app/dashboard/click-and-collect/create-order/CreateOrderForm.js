"use client";

import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { handleValidationError } from "@/app/_hooks/useHandleValidationError";
import SelectProduct from "./SelectProduct";
import SelectAttribute from "./SelectAttribute";
import { createOrder } from "@/app/_services/apiOrders";

const CreateOrderForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

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
      variants: [{ attribute: "", attribute_value: "" }],
    },
  });

  async function onSubmit(formData) {
    try {
      const res = await createOrder(formData);

      if (res) {
        toast.success(res.data.message);
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
        Create New Order
      </h1>
      <form className="md:py-8 p-2 md:px-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-x-9 gap-y-6">
          <SelectProduct register={register} />
          <SelectAttribute control={control} />
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Customer Name
            </label>
            <div className="mt-1">
              <input
                {...register("customer_name", {
                  required: "This is required field",
                })}
                type="text"
                placeholder="Customer Name"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.customer_name && (
                <span className="text-red-500 text-sm">
                  {errors.customer_name.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Customer Email
            </label>
            <div className="mt-1">
              <input
                {...register("customer_email", {
                  required: "This is required field",
                })}
                type="email"
                placeholder="Customer Email"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.customer_email && (
                <span className="text-red-500 text-sm">
                  {errors.customer_email.message}
                </span>
              )}
            </div>
          </div>

          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Customer Address
            </label>
            <div className="mt-1">
              <input
                {...register("customer_address", {
                  required: "This is required field",
                })}
                type="text"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.customer_address && (
                <span className="text-red-500 text-sm">
                  {errors.customer_address.message}
                </span>
              )}
            </div>
          </div>

          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Customer City
            </label>
            <input
              {...register("customer_city", {
                required: "This is required field",
              })}
              type="text"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.customer_city && (
              <span className="text-red-500 text-sm">
                {errors.customer_city.message}
              </span>
            )}
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 required-field">
              Customer Postal Code
            </label>
            <div className="mt-1">
              <input
                {...register("customer_post_code", {
                  required: "This is required field",
                })}
                type="number"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.customer_post_code && (
                <span className="text-red-500 text-sm">
                  {errors.customer_post_code.message}
                </span>
              )}
            </div>
          </div>

          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Customer Phone
            </label>
            <div className="mt-1">
              <input
                {...register("customer_phone", {
                  required: "This is required field",
                })}
                type="tel"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.customer_phone && (
                <span className="text-red-500 text-sm">
                  {errors.customer_phone.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Total
            </label>
            <div className="mt-1">
              <input
                {...register("total", {
                  required: "This is required field",
                })}
                type="number"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.total && (
                <span className="text-red-500 text-sm">
                  {errors.total.message}
                </span>
              )}
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
      <div className="md:py-8 p-2 md:px-6"></div>
    </>
  );
};

export default CreateOrderForm;
