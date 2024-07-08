"use client";
import { useEvent } from "@/app/_features/events/useEvents";
import { useRoles } from "@/app/_features/roles/useRoles";
import { updateEvent } from "@/app/_services/apiEvents";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateEventTab = ({
  id,
  startDate,
  endDate,
  title,
  description,
  visible,
  setOpen,
}) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useRoles();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      title: title,
      description: description,
      visible_to: visible,
      start_date: moment(startDate).format("YYYY-MM-DD"),
      end_date: moment(endDate).format("YYYY-MM-DD"),
    },
  });

  console.log(startDate, endDate);

  async function onSubmit({
    title,
    description,
    visible_to,
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
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Visible to
          </label>
          <div className="mt-2">
            <select
              {...register("visible_to")}
              disabled={isSubmitting}
              type="text"
              className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            >
              {!isLoading &&
                data?.data?.rolesWithPermissions
                  .filter((role) => role.id !== 1)
                  .map((role) => (
                    <option key={role.name} value={role.name}>
                      {role.name}
                    </option>
                  ))}
              <option value="anyone">anyone</option>
              <option value="onlyme">only me</option>
            </select>
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 font-serif flex justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
          >
            {isSubmitting ? <SpinnerMini /> : "Update"}
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateEventTab;
