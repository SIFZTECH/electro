"use client";

import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { updateStore } from "@/app/_services/apiStores";
import { handleValidationError } from "@/app/_hooks/useHandleValidationError";
import { getCoordinatesFromUrl } from "@/app/lib/utils";
import SelectPosition from "./add-new-store/SelectPosition";

const EditStore = ({ store }) => {
  const [open, setOpen] = useState();
  const [open2, setOpen2] = useState();
  const position = useRef();

  const regex = /(-?\d+\.?\d*)/g;
  // Use match() to find all number substrings
  const numbers = store.map_url.match(regex);

  // Convert strings to numbers using parseFloat()
  const exitingCoordinates = numbers.map(parseFloat);

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      firstname: store?.firstname,
      lastname: store?.lastname,
      email: store?.email,
      phone: store?.phone,
      company_name: store?.company_name,
      weburl: store?.weburl,

      description: store?.description,
      street_address: store?.street_address,
      city: store?.city,
      postal_code: store?.postal_code,
      state: store?.state,
      map_url: `Lat: ${exitingCoordinates[0]}, Lng: ${exitingCoordinates[1]}`,
      status: store?.status,
      weeks: store?.weeks || [
        {
          day: "",
          opening_hours: "0:00",
          closing_hours: "0:00",
          is_holiday: 0,
        },
      ],
    },
  });

  const [coordinates, setCoordinates] = useState({
    lat: exitingCoordinates[0],
    lng: exitingCoordinates[1],
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "weeks",
  });

  useEffect(
    function () {
      const latlng = `Lat: ${exitingCoordinates[0]}, Lng: ${exitingCoordinates[1]}`;

      setValue("map_url", latlng);
    },
    [coordinates]
  );

  async function onSubmit(formData) {
    

    try {
      if (!formData.map_url) {
        return toast.error("Please select your position");
      }
      const res = await updateStore(store.id, {
        ...formData,
        map_url: coordinates
      });
      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("stores");
        setOpen((open) => !open);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        err.response.data?.data
          ? handleValidationError(err.response.data.data)
          : toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
      <DialogTrigger className="btn-primary transition-all py-1 bg-amber-200">
        Edit
      </DialogTrigger>
      <DialogContent className="max-w-fit max-h-dvh overflow-y-auto">
        <div>
          <h2 className="font-serif text-lg">Edit Store</h2>
          <p className="text-sm text-gray-800 mt-3">
            Make changes to your Store here. Click save when you&apos;re done.
          </p>
          <form
            className="md:py-8 p-2 md:px-6"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 required-field">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    {...register("email", {
                      required: "This is required field",
                    })}
                    type="email"
                    placeholder="Your Email"
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
                <div className="mt-1 relative">
                  <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1 after:content-['*'] after:ml-0.5 after:text-red-600">
                    Your Position
                  </label>
                  <input
                    {...register("map_url")}
                    readOnly
                    placeholder="Your Position"
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {open2 ? (
                    <span
                      className="btn-primary absolute right-2 top-2/4"
                      onClick={() => setOpen2((open) => !open)}
                    >
                      Close map
                    </span>
                  ) : (
                    <span
                      className="btn-primary absolute right-2 top-2/4"
                      onClick={() => setOpen2((open) => !open)}
                    >
                      Open map
                    </span>
                  )}
                  {errors?.map_url && (
                    <span className="text-red-500 text-sm">
                      {errors.map_url.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-span-2">
                {open2 && (
                  <SelectPosition
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                  />
                )}
              </div>

              <div className="col-span-2">
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row gap-3 md:gap-8 md:items-center w-full "
                  >
                    <div className="flex flex-col md:flex-row gap-3 md:gap-8 md:items-center w-full">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1 after:content-['*'] after:ml-0.5 after:text-red-600">
                          Days
                        </label>
                        <Controller
                          name={`weeks[${index}].day`}
                          control={control}
                          rules={{ required: "Day field is required" }}
                          defaultValue={item.day}
                          render={({ field }) => (
                            <select
                              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed "
                              {...field}
                            >
                              <option value="">Select Days</option>
                              <option value="sun">Sun</option>
                              <option value="mon">Mon</option>
                              <option value="tue">Tue</option>
                              <option value="wed">Wed</option>
                              <option value="thu">Thu</option>
                              <option value="fri">Fri</option>
                              <option value="sat">Sat</option>
                            </select>
                          )}
                        />
                        {errors?.day?.[index]?.day && (
                          <span className="text-red-500 text-sm self-center">
                            {errors.day[index].day.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-8 md:items-center w-full">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1 after:content-['*'] after:ml-0.5 after:text-red-600">
                          Is Holiday
                        </label>
                        <Controller
                          name={`weeks[${index}].is_holiday`}
                          control={control}
                          defaultValue={`${item.is_holiday}`}
                          render={({ field }) => (
                            <select
                              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed "
                              {...field}
                            >
                              <option value="">--Select--</option>
                              <option value={0}>Yes</option>
                              <option value={1}>No</option>
                            </select>
                          )}
                        />
                        {errors?.weeks?.[index]?.is_holiday && (
                          <span className="text-red-500 text-sm self-center">
                            {errors.weeks[index].is_holiday.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-8 md:items-center w-full">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1 after:content-['*'] after:ml-0.5 after:text-red-600">
                          Opening Hours
                        </label>
                        <Controller
                          name={`weeks[${index}].opening_hours`}
                          control={control}
                          rules={{ required: "This field is required" }}
                          defaultValue={item.opening_hours}
                          render={({ field }) => (
                            <input
                              type="time"
                              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                              {...field}
                            />
                          )}
                        />
                        {errors?.opening_hours?.[index]?.opening_hours && (
                          <span className="text-red-500 text-sm self-center">
                            {errors.opening_hours[index].opening_hours.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-8 md:items-center w-full">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1 after:content-['*'] after:ml-0.5 after:text-red-600">
                          Closing Hours
                        </label>
                        <Controller
                          name={`weeks[${index}].closing_hours`}
                          control={control}
                          rules={{
                            required: "closing_hours field is required",
                          }}
                          defaultValue={item.closing_hours}
                          render={({ field }) => (
                            <input
                              type="time"
                              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                              {...field}
                            />
                          )}
                        />
                        {errors?.opening_hours?.[index]?.opening_hours && (
                          <span className="text-red-500 text-sm self-center">
                            {errors.opening_hours[index].opening_hours.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className="btn-primary bg-red-400 texl-sm text-gray-50 py-[9px] self-end cursor-pointer"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </span>
                  </div>
                ))}
                <span
                  className="btn-primary font-serif text-sm mt-3 inline-block"
                  onClick={() =>
                    append({
                      day: "",
                      is_holiday: false,
                      opening_hours: "0:00",
                      closing_hours: "0:00",
                    })
                  }
                >
                  Add More Holydays
                </span>
              </div>
              <div className="">
                <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 required-field">
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
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary mt-5 font-semibold rounded-sm px-6 py-2"
            >
              {isSubmitting ? <SpinnerMini /> : "Save"}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditStore;
