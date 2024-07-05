import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateOrderStatus } from "@/app/_services/apiOrders";
import { useRouter } from "next/navigation";
import { handleValidationError } from "@/app/_hooks/useHandleValidationError";

const UpdateStatus = ({ id, status }) => {
  const [open, setOpen] = useState();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,

    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit({ status }) {
    try {
      const res = await updateOrderStatus(id, { status });

      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("orders");
        router.back(-1);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        err.response?.data?.data
          ? handleValidationError(err.response?.data?.data)
          : toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
      <DialogTrigger className="btn-primary">Update Status</DialogTrigger>
      <DialogContent>
        <div>
          <h2 className="font-serif text-lg font-semibold">
            Update your Order Status
          </h2>
          <p className="text-sm text-gray-800 mt-3">
            Update your Order Status. Click update when you&apos;re done.
          </p>
          <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-8 items-center w-full">
              <div className="flex-1">
                <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                  Status
                </label>
                <Controller
                  render={({ field }) => (
                    <select
                      className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                      {...field}
                    >
                      <option className="capitalize" value="pending">
                        pending
                      </option>
                      <option className="capitalize" value="collected">
                        collected
                      </option>
                      <option className="capitalize" value="delivered">
                        delivered
                      </option>
                    </select>
                  )}
                  name="status"
                  control={control}
                  defaultValue={status || ""}
                />
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatus;
