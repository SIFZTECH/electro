"use client";

import toast from "react-hot-toast";
import { createNewRole } from "@/app/_services/apiUsers";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import Spinner from "@/app/components/ui/Spinner";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRoles } from "@/app/_features/roles/useRoles";

const CreateNewRole = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, data } = useRoles();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      const res = await createNewRole(data);

      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("roles");
        setOpen((open) => !open);
        reset();
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
      <DialogTrigger className="mb-6">
        <span className="btn-primary transition-all py-1 border-color-primary">
          Add new Role
        </span>
      </DialogTrigger>
      <DialogContent className="max-h-dvh">
        <div>
          <h2 className="font-serif text-lg">Create new Role</h2>
          <p className="text-sm text-gray-800 mt-3">
            Make changes to your role here. Click save when you're done.
          </p>
          <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Role Name
              </label>
              <input
                {...register("name", {
                  required: "This is required field",
                })}
                disabled={isSubmitting}
                type="text"
                className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-wrap flex-col gap-2">
              <h1 className="mt-4 font-semibold font-serif">Permissions</h1>
              <div className="mb-2 flex flex-wrap gap-y-3 gap-x-4 items-center">
                {!isLoading &&
                  data?.data.permissions.map((permission) => (
                    <div
                      className="flex gap-2 items-center"
                      key={permission.id}
                    >
                      <input
                        type="checkbox"
                        {...register(permission.name)}
                        value={permission.name}
                      />
                      <label
                        key="permission"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {permission.name}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 font-serif flex justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
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

export default CreateNewRole;
