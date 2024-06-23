"use client";

import { useRoles } from "@/app/_features/roles/useRoles";
import { handleValidationError } from "@/app/_hooks/useHandleValidationError";
import { createEvent } from "@/app/_services/apiEvents";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateNewEvent = ({ date, setOpen }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      date: date || Date.now(),
    },
  });
  const { isLoading, data } = useRoles();

  async function onSubmit({ date, title, visible_to }) {
    const specificDate = new Date(date);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const formattedDate = specificDate.toLocaleDateString("en-CA", options);

    try {
      const res = await createEvent({ date: formattedDate, title, visible_to });

      if (res) {
        toast.success("New Event Created Successfully");
        queryClient.invalidateQueries("events");
        setOpen((open) => !open);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        err.response.data.data
          ? handleValidationError(err.response.data.data)
          : toast.error(err.response.data.message);
      } else {
        toast.success(err.message);
      }
    }
  }

  return (
    <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
          Event Name
        </label>
        <div className="mt-2">
          <input
            {...register("title", {
              required: "This is required field",
            })}
            disabled={isSubmitting}
            type="text"
            className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
          {errors?.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
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
              data?.data?.rolesWithPermissions.map((role) => (
                <option key={role.name} value={role.name}>
                  {role.name === "admin" ? "only me" : role.name}
                </option>
              ))}
            <option value="anyone">anyone</option>
          </select>
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 font-serif flex justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
        >
          {isSubmitting ? <SpinnerMini /> : "Create Event"}
        </button>
      </div>
    </form>
  );
};

export default CreateNewEvent;
