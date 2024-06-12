"use client";
import { useRoles } from "@/app/_features/roles/useRoles";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useForm } from "react-hook-form";

const UpdateEventTab = () => {
  const { data, isLoading } = useRoles();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  return (
    <>
      <p>Click update when you're done.</p>
      <form className="space-y-3 mt-4" onSubmit={handleSubmit()}>
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
            Visible to
          </label>
          <div className="mt-2">
            {!isLoading && (
              <select
                {...register("visible_to")}
                disabled={isSubmitting}
                type="text"
                className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
              >
                {data?.data?.rolesWithPermissions.map((role) => (
                  <option key={role.name} value={role.name}>
                    {role.name === "admin" ? "only me" : role.name}
                  </option>
                ))}
                <option value="anyone">anyone</option>
              </select>
            )}
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
