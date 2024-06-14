"use client";

import { deleteAttribute } from "@/app/_services/apiAttributes";
import { deleteCategory } from "@/app/_services/apiCategories";
import SpinnerMini from "@/app/components/ui/SpinnerMini";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DeleteAttribute = ({ attribute }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log("attribute", attribute);

  async function onSubmit() {
    try {
      const res = await deleteAttribute(attribute);
      console.log(res);

      if (res) {
        toast.success(res.message);

        queryClient.invalidateQueries("attributes");
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
    <Dialog>
      <DialogTrigger className="btn-primary text-white transition-all py-1 bg-red-500 hover:bg-red-400">
        Delete
      </DialogTrigger>
      <DialogContent>
        <div>
          <h2 className="font-serif text-xl">Delete Attribute</h2>
          <div>
            <p className="mt-3">
              Are you sure you want to delete this attribute
            </p>
            <p className="text-sm text-gray-800 mt-3">
              This will delete your Attribute permanently. You cannot undo this
              action.
            </p>
            <form className="flex gap-3 mt-6" onSubmit={handleSubmit(onSubmit)}>
              <DialogClose className="btn-primary bg-transparent border border-gray-900">
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

export default DeleteAttribute;
