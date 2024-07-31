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
import { createFeature } from "@/app/_services/apiFeatures";

const CreateNewFeature = () => {
  const [open, setOpen] = useState();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit({ key, icon }) {
    try {
      const res = await createFeature({ key, icon: icon[0] });

      if (res) {
        toast.success(res.message);

        queryClient.invalidateQueries("key_features");
        setOpen((open) => !open);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
      <DialogTrigger className="btn-primary">Add New Key Feature</DialogTrigger>
      <DialogContent>
        <div>
          <h2 className="font-serif text-lg font-semibold">
            Create new Key Feature
          </h2>
          <p className="text-sm text-gray-800 mt-3">
            Create new Key Feature. Click create when you&apos;re done.
          </p>
          <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Feature Key
              </label>
              <div className="mt-2">
                <input
                  {...register("key", {
                    required: "This filed is required",
                  })}
                  disabled={isSubmitting}
                  type="text"
                  placeholder="Enter Brand Name"
                  className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.key && (
                  <span className="text-red-500 text-sm">
                    {errors.key.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
                Feature Icon
              </label>

              <input
                {...register("icon", {
                  required: "This is required field!",
                })}
                type="file"
                placeholder="Upload your Feature Icon"
                accept=".png,.jpg,.jpeg"
                className="block w-full border border-gray-300 rounded-md py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold file:ring-1
                file:ring-color-primary file:text-color-primary
                file:hover:ring-2 file:bg-transparent"
              />
              {errors?.icon && (
                <span className="text-red-500 text-sm">
                  {errors.icon.message}
                </span>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 font-serif flex justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-color-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
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

export default CreateNewFeature;
