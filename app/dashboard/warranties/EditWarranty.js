"use client";

import { updateWarrantyStatus } from "@/app/_services/apiWarranties";
import SpinnerMini from "@/app/components/ui/SpinnerMini";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditWarranty = ({ warranty }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      status: warranty.status,
    },
  });

  const watchStatus = watch("status");

  async function onSubmit({ status, message }) {
    try {
      const res = await updateWarrantyStatus(warranty.id, { status, message });

      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("warranties");
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
      <DialogTrigger className="btn-primary bg-green-400 transition-all py-1">
        Edit status
      </DialogTrigger>
      <DialogContent className="">
        <div>
          <h2 className="font-serif text-lg">Edit Warranty Status</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Select Status
            </label>
            <div className="mt-2">
              <select
                className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                {...register("status")}
              >
                <option value="pending">Pending</option>
                <option value="approve">Approve</option>
                <option value="decline">Decline</option>
              </select>
              {watchStatus === "approve" && (
                <textarea
                  {...register("message")}
                  className="mt-4 block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Send message..."
                />
              )}
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
