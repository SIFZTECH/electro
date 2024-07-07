import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { handleValidationError } from "@/app/_hooks/useHandleValidationError";
import moment from "moment";
import { CreateNewSocialAssets } from "@/app/_services/apiMedia";
import SelectUser from "./SelectUser";

const CreateNewAssets = () => {
  const [open, setOpen] = useState();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      access_users: [],
    },
  });

  const checkedAnyoneAccessBox = watch("access_to_anyone");

  async function onSubmit(formData) {
    const start_date = moment(formData.start_date).format("MM/DD/YYYY");
    const end_date = moment(formData.end_date).format("MM/DD/YYYY");
    try {
      const res = await CreateNewSocialAssets({
        ...formData,
        start_date,
        end_date,
      });
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
            Create new Resources. Click create when you&apos;re done.
          </p>
          <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 required-field">
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
              <label className="block text-sm font-medium leading-6 text-gray-900 required-field">
                Start Date
              </label>
              <div className="mt-2">
                <input
                  {...register("start_date", {
                    required: "This filed is required",
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
              <label className="block text-sm font-medium leading-6 text-gray-900 required-field">
                End Date
              </label>
              <div className="mt-2">
                <input
                  {...register("end_date", {
                    required: "This filed is required",
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
            {!checkedAnyoneAccessBox && <SelectUser control={control} />}

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
