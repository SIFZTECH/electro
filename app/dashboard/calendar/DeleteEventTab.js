"use client";

import { DialogClose } from "@/app/components/ui/dialog";

import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useForm } from "react-hook-form";

const DeleteEventTab = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  return (
    <div className="px-3">
      <h2 className="font-serif text-lg">Delete this Event</h2>
      <div>
        <p className="mt-3">Are you sure you want to Delete this Event</p>
        <p className="text-sm text-gray-800 mt-3">
          This will Delete this Event
        </p>
        <form className="flex gap-3 mt-6" onSubmit={handleSubmit()}>
          <DialogClose className="btn-primary bg-transparent border border-gray-900">
            Cencel
          </DialogClose>
          <button type="submit" className="btn-primary bg-red-500 text-white">
            {isSubmitting ? <SpinnerMini /> : "Delete"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteEventTab;
