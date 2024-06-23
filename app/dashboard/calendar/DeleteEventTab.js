"use client";

import { deleteEvent } from "@/app/_services/apiEvents";
import { DialogClose } from "@/app/components/ui/dialog";

import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DeleteEventTab = ({ id, setOpen }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  async function onSubmit() {
    try {
      const res = await deleteEvent(id);

      if (res) {
        toast.success("New Event Created Successfully");
        queryClient.invalidateQueries("events");
        setOpen((open) => !open);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.success(err.message);
      }
    }
  }

  return (
    <div className="px-3">
      <h2 className="font-serif text-lg">Delete this Event</h2>
      <div>
        <p className="mt-3">Are you sure you want to Delete this Event</p>
        <p className="text-sm text-gray-800 mt-3">
          This will Delete this Event
        </p>
        <form className="flex gap-3 mt-6" onSubmit={handleSubmit(onSubmit)}>
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
