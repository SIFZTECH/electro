"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useForm } from "react-hook-form";

const DeletePermission = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  return (
    <Dialog>
      <DialogTrigger className="btn-primary text-white transition-all py-1 bg-red-500 hover:bg-red-400">
        Delete
      </DialogTrigger>
      <DialogContent>
        <div>
          <h2 className="font-serif text-xl">Delete this User</h2>
          <div>
            <p className="mt-3">
              Are you sure you want to delete this user #Name
            </p>
            <p className="text-sm text-gray-800 mt-3">
              This will Delete your role.
            </p>
            <form className="flex gap-3 mt-6">
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

export default DeletePermission;
