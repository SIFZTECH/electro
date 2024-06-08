"use client";

import { updateWarranty } from "@/app/_services/apiWarranties";
import SpinnerMini from "@/app/components/ui/SpinnerMini";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const EditWarranty = ({ warranty }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: warranty.firstname,
      lastname: warranty.lastname,
      email: warranty.email,
      phone: warranty.phone,
      company_name: warranty.company_name,
      address: warranty.address,
      purchase_from: warranty.from,
      purchase_date: warranty.purchase_date,
      invoice_number: warranty.purchase_date,
      bike_frame_serial_no: warranty.bike_frame_serial_no,
      bike_battery_serial_no: warranty.bike_battery_serial_no,
      bike_motor_serial_no: warranty.bike_motor_serial_no,
    },
  });

  async function onSubmit(data) {
    try {
      const res = await updateWarranty(warranty.id, data);

      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("warranties");
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="btn-primary transition-all py-1">
        Edit
      </DialogTrigger>
      <DialogContent className="!max-w-[60rem] max-h-dvh overflow-y-scroll">
        <div>
          <h2 className="font-serif text-lg">Edit Warranty</h2>
          <p className="text-sm text-gray-800 mt-3">
            Make changes to your Warranty here. Click save when you're done.
          </p>
        </div>
        <form className="md:py-8 p-2 md:px-6" onSubmit={handleSubmit(onSubmit)}>
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
                    required: "This field is required",
                  })}
                  id="lastName"
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
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="Company Name"
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
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Address
              </label>
              <div className="mt-1">
                <input
                  {...register("address", {
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="Street Address"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                Purchase From
              </label>
              <input
                {...register("purchase_from", {
                  required: "This field is required",
                })}
                type="date"
                placeholder="Purchase from"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.purchase_from && (
                <span className="text-red-500 text-sm">
                  {errors.purchase_from.message}
                </span>
              )}
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                Purchase Date
              </label>
              <input
                {...register("purchase_date", {
                  required: "This field is required",
                })}
                type="date"
                placeholder="Purchase Date"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.purchase_date && (
                <span className="text-red-500 text-sm">
                  {errors.purchase_date.message}
                </span>
              )}
            </div>
            <div className="">
              <label className="flex items-center gap-1 text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                <span>Invoice Number</span>
                <AiOutlineExclamationCircle size={18} />
              </label>
              <div className="mt-1">
                <input
                  {...register("invoice_number", {
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="Invoice Number"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.invoice_number && (
                  <span className="text-red-500 text-sm">
                    {errors.invoice_number.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
                Upload your Invoice
              </label>
              <div className="mt-1">
                <small className="text-sm mb-1">
                  Your photo should be PNG or JPG format
                </small>
                <input
                  {...register("invoice_image")}
                  type="file"
                  placeholder="Upload your Invoice"
                  accept=".png,.jpg"
                  className="block w-full rounded-md py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold file:ring-1
                file:ring-color-primary file:text-color-primary
                file:hover:ring-2 file:bg-transparent"
                />
              </div>
            </div>

            <div className="">
              <label className="flex items-center gap-1 text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                <span>Bike Frame Serial Number</span>
                <AiOutlineExclamationCircle size={18} />
              </label>
              <div className="mt-1">
                <input
                  {...register("bike_frame_serial_no", {
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="Bike Frame Serial Number"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.bike_frame_serial_no && (
                  <span className="text-red-500 text-sm">
                    {errors.bike_frame_serial_no.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
                Upload your Bike Frame Serial Number
              </label>
              <div className="mt-1">
                <small className="text-sm mb-1">
                  Your photo should be PNG or JPG format
                </small>
                <input
                  {...register("frame_serial_no_image")}
                  type="file"
                  accept=".png,.jpg"
                  placeholder="Upload your Invoice"
                  className="block w-full rounded-md py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold file:ring-1
                file:ring-color-primary file:text-color-primary
                file:hover:ring-2 file:bg-transparent"
                />
              </div>
            </div>
            <div className="">
              <label className="flex items-center gap-1 text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                <span>Bike Battary Serial Number </span>
                <AiOutlineExclamationCircle size={18} />
              </label>
              <div className="mt-1">
                <input
                  {...register("bike_battery_serial_no", {
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="Bike Battary Serial Number"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.bike_battery_serial_no && (
                  <span className="text-red-500 text-sm">
                    {errors.bike_battery_serial_no.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
                Upload your Bike Battary Serial Number
              </label>
              <div className="mt-1">
                <small className="text-sm mb-1">
                  Your photo should be PNG or JPG format
                </small>
                <input
                  {...register("battery_serial_no_image")}
                  type="file"
                  accept=".png,.jpg"
                  className="block w-full rounded-md py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold file:ring-1
                file:ring-color-primary file:text-color-primary
                file:hover:ring-2 file:bg-transparent"
                />
              </div>
            </div>
            <div className="">
              <label className="flex items-center gap-1 text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                <span>Bike Motor Serial Number</span>
                <AiOutlineExclamationCircle size={18} />
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register("bike_motor_serial_no", {
                    required: "This field is required",
                  })}
                  placeholder="Bike Motor Serial Number"
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.bike_motor_serial_no && (
                  <span className="text-red-500 text-sm">
                    {errors.bike_motor_serial_no.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
                Upload your Bike Motor Serial Number
              </label>
              <div className="mt-1">
                <small className="text-sm mb-1">
                  Your photo should be PNG or JPG format
                </small>
                <input
                  {...register("motor_serial_no_image")}
                  type="file"
                  accept=".png,.jpg"
                  className="block w-full rounded-md py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold file:ring-1
                file:ring-color-primary file:text-color-primary
                file:hover:ring-2 file:bg-transparent"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn-primary mt-5 font-semibold rounded-sm px-6 py-2"
          >
            {isSubmitting ? <SpinnerMini /> : "Save"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditWarranty;
