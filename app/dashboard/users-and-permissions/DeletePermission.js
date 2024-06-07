"use client";

import { useToast } from "@/app/_hooks/use-toast";
import { deletePermission, deleteRole } from "@/app/_services/apiUsers";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const DeletePermission = ({ roleName }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm();

  async function onSubmit({ permission_name }) {
    try {
      const res = await deletePermission(permission_name);
      console.log(res);

      if (res) {
        toast({
          variant: "success",
          title: res.message,
          duration: 1000,
        });
        queryClient.invalidateQueries("roles");

        setOpen((open) => !open);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast({
          variant: "destructive",
          title: err.response.data.message,
          duration: 1000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          duration: 1000,
        });
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
      <DialogTrigger className="btn-primary text-white transition-all py-1 bg-red-500 hover:bg-red-400">
        Delete Permission
      </DialogTrigger>
      <DialogContent>
        <div>
          <h2 className="font-serif text-xl">Enter permission name</h2>
          <div>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="mt-2">
                  <input
                    {...register("permission_name", {
                      required: "This is required field",
                    })}
                    disabled={isSubmitting}
                    type="text"
                    className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {errors?.permission_name && (
                    <span className="text-red-500 text-sm">
                      {errors.permission_name.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <DialogClose className="btn-primary bg-transparent border border-gray-900">
                  Cencel
                </DialogClose>

                <button
                  type="submit"
                  className="btn-primary bg-red-500 text-white"
                >
                  {isSubmitting ? <SpinnerMini /> : "Delete"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePermission;
