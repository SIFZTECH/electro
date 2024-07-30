"use client";

import { updateEvent } from "@/app/_services/apiEvents";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SelectUser from "./SelectUser";
import { useState } from "react";

const UpdateEventTab = ({
  id,
  startDate,
  endDate,
  title,
  description,
  visible_to,
  visible_to_anyone,
  color,
  setColor,
  setOpen,
}) => {
  const [color2, setColor2] = useState(color);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      title: title,
      description: description,
      visible_to: visible_to,
      visible_to_anyone: visible_to_anyone === 1 ? true : false,
      value: color,
      start_date: moment(startDate).format("YYYY-MM-DD"),
      end_date: moment(endDate).format("YYYY-MM-DD"),
    },
  });

  const checkedAnyoneAccessBox = watch("visible_to_anyone");

  async function onSubmit({
    title,
    description,
    visible_to,
    visible_to_anyone,
    start_date,
    end_date,
  }) {
    const specificDate = new Date(start_date);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const formattedDate = specificDate.toLocaleDateString("en-CA", options);
    const formattedStartDate = moment(start_date).format("MM/DD/YYYY");
    const formattedEndDate = moment(end_date).format("MM/DD/YYYY");

    try {
      const res = await updateEvent(id, {
        title,
        description,
        visible_to,
        visible_to_anyone,
        color: color2,
        date: formattedDate,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      });
      if (res) {
        toast.success("Event updated");
        queryClient.invalidateQueries("events");
        setOpen((open) => !open);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.success(err.message);
      }
    }
  }

  const handleColorChange = (event) => {
    setColor2(event.target.value);
  };

  return (
    <>
      <p>Click update when you&apos;re done.</p>
      <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Event Name
          </label>
          <div className="mt-2">
            <input
              {...register("title", {
                required: "This is required field",
              })}
              disabled={isSubmitting}
              className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Event Description
          </label>
          <div className="mt-2">
            <textarea
              {...register("description", {
                required: "This is required field",
              })}
              disabled={isSubmitting}
              className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Start Date
          </label>
          <div className="mt-2">
            <input
              {...register("start_date", {
                required: "This is required field",
              })}
              disabled={isSubmitting}
              type="date"
              className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.start_date && (
              <span className="text-red-500 text-sm">
                {errors.start_date.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            End Date
          </label>
          <div className="mt-2">
            <input
              {...register("end_date", {
                required: "This is required field",
              })}
              disabled={isSubmitting}
              type="date"
              className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.end_date && (
              <span className="text-red-500 text-sm">
                {errors.end_date.message}
              </span>
            )}
          </div>
        </div>
        <div className="font-serif text-sm flex flex-col gap-2">
          <div className="flex justify-start items-center">
            <label
              htmlFor="color-code"
              className="mr-2 btn-primary bg-green-400"
            >
              Get your color code
            </label>
            <input
              {...register("value", {
                required: "This filed is required",
              })}
              id="color-code"
              type="color"
              onChange={handleColorChange}
            />
          </div>
          <p className="flex-1">Selected Color Hex Value: {color2}</p>
        </div>
        {!checkedAnyoneAccessBox && (
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Visible to
            </label>
            <div className="mt-2">
              <SelectUser control={control} register={register} />
            </div>
          </div>
        )}

        <div className="flex gap-1 items-center">
          <input
            {...register("visible_to_anyone")}
            id="visible_to_anyone"
            disabled={isSubmitting}
            type="checkbox"
          />

          <label
            className="block text-sm font-medium text-gray-900"
            htmlFor="visible_to_anyone"
          >
            Visible to anyone
          </label>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 font-serif flex justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-color-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
          >
            {isSubmitting ? <SpinnerMini /> : "Update"}
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateEventTab;
