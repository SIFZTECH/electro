import { createCategory } from "@/app/_services/apiCategories";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUsers } from "@/app/_features/users/useUsers";
import { handleValidationError } from "@/app/_hooks/useHandleValidationError";
import moment from "moment";
import { CreateNewSocialAssets } from "@/app/_services/apiMedia";

const CreateNewAssets = () => {
  const [open, setOpen] = useState();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useUsers();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      access_users: [{ id: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "access_users",
  });

  const checkedAnyoneAccessBox = watch("access_to_anyone");

  async function onSubmit({
    folder_name,
    visible_date,
    access_users,
    access_to_anyone,
  }) {
    const fotmattedUsers = access_users.map((user) => Number(user.id));
    const formattedDateStr = moment(visible_date).format("MM/DD/YYYY");

    try {
      const res = await CreateNewSocialAssets({
        folder_name,
        access_users: fotmattedUsers,
        access_to_anyone,
        visible_date: formattedDateStr,
      });
      console.log(res);
      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("resources");
        setOpen((open) => !open);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        err.response.data.data
          ? handleValidationError(err.response.data.data)
          : toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
      <DialogTrigger className="btn-primary">
        Add New Social Media Assets
      </DialogTrigger>
      <DialogContent>
        <div>
          <h2 className="font-serif text-lg font-semibold">
            Create new Resources
          </h2>
          <p className="text-sm text-gray-800 mt-3">
            Create new Resources. Click create when you're done.
          </p>
          <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Folder Name
              </label>
              <div className="mt-2">
                <input
                  {...register("folder_name", {
                    required: "This filed is required",
                  })}
                  disabled={isSubmitting}
                  type="text"
                  className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.folder_name && (
                  <span className="text-red-500 text-sm">
                    {errors.folder_name.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Visible Date
              </label>
              <div className="mt-2">
                <input
                  {...register("visible_date", {
                    required: "This filed is required",
                  })}
                  disabled={isSubmitting}
                  type="date"
                  className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.visible_date && (
                  <span className="text-red-500 text-sm">
                    {errors.visible_date.message}
                  </span>
                )}
              </div>
            </div>
            {!checkedAnyoneAccessBox && (
              <div>
                {fields.map((item, index) => (
                  <div className="flex gap-8 items-center w-full" key={item.id}>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                        Access Users
                      </label>
                      <Controller
                        render={({ field }) => (
                          <select
                            className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                            {...field}
                          >
                            <option value="">--Select User--</option>
                            {!isLoading &&
                              !isError &&
                              !error &&
                              data?.data.map((user) => (
                                <option
                                  className="capitalize"
                                  value={user.id}
                                  key={user.id}
                                >
                                  {user.firstname} {user.lastname}
                                </option>
                              ))}
                          </select>
                        )}
                        name={`access_users[${index}].id`}
                        control={control}
                        defaultValue={item.id}
                      />
                    </div>

                    <span
                      className="btn-primary texl-sm bg-gray-200 py-[8px] self-end cursor-pointer"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </span>
                  </div>
                ))}
                <span
                  className="btn-primary font-serif text-sm inline-block mt-3"
                  onClick={() => append({ id: null })}
                >
                  Add More Users
                </span>
              </div>
            )}
            <div className="flex gap-1 items-center">
              <input
                {...register("access_to_anyone")}
                id="access_to_anyone"
                disabled={isSubmitting}
                type="checkbox"
              />

              <label
                className="block text-sm font-medium text-gray-900"
                htmlFor="access_to_anyone"
              >
                Access to anyone
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 font-serif flex justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
              >
                {isSubmitting ? <SpinnerMini /> : "Create"}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewAssets;
