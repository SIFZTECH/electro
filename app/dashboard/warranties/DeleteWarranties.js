"use client";

import { deleteWarrantyForBulk } from "@/app/_services/apiWarranties";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { Button } from "@/app/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DeleteWarranties = ({ warranty_ids }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit() {
    try {
      const res = await deleteWarrantyForBulk({
        action: "delete",
        warranty_ids,
      });

      console.log(res);

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
      <DialogTrigger>
        <Button
          variant="outline"
          className="bg-red-500 !text-white hover:bg-red-400"
          size="sm"
        >
          Delete Selected Warranty
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <h2 className="font-serif text-xl">Delete Selected Warranty</h2>
          <div>
            <p className="mt-3">
              Are you sure you want to delete those warranties
            </p>
            <p className="text-sm text-gray-800 mt-3">
              This will delete your Warranty permanently. You cannot undo this
              action.
            </p>
            <form className="flex gap-3 mt-6" onSubmit={handleSubmit(onSubmit)}>
              <DialogClose className="btn-primary text-color-primary bg-transparent border border-color-primary">
                Cencel
              </DialogClose>
              <button
                type="submit"
                className="btn-primary bg-red-500 text-white"
              >
                {isSubmitting ? <SpinnerMini /> : "Delete"}
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWarranties;
