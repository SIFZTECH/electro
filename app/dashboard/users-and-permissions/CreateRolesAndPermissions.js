"use client";

import { useRoles } from "@/app/_features/roles/useRoles";
import toast from "react-hot-toast";
import { createRolesWithPermission } from "@/app/_services/apiUsers";
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

const CreateRolesAndPermissions = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useRoles();

  if (isLoading) return <Spinner />;

  async function onSubmit(formData) {
    try {
      const res = await createRolesWithPermission(formData);

      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("roles");
        setOpen((open) => !open);
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
          Assign Perimissions
        </span>
      </DialogTrigger>
      <DialogContent className="max-h-dvh">
        <div>
          <h2 className="font-serif text-lg">Assign Perimissions</h2>
          <p className="text-sm text-gray-800 mt-3">
            Make changes to your user Perimissions here. Click save when you're
            done.
          </p>
          <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Role Name
              </label>
              {!isLoading && (
                <select
                  {...register("role_name")}
                  disabled={isSubmitting}
                  type="text"
                  className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                >
                  {data?.data?.rolesWithPermissions.map((role) => (
                    <option
                      className="capitalize"
                      key={role.name}
                      value={role.name}
                    >
                      {role.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <h1 className="mt-4 font-semibold text-lg font-serif">
              Perimissions
            </h1>
            <div className="flex flex-wrap gap-2">
              {data.data.permissions.map((permission) => (
                <div
                  key={permission.id}
                  className="mt-2 flex gap-2 items-center"
                >
                  <input
                    type="checkbox"
                    {...register(`${permission.name}`)}
                    value={permission.name}
                  />
                  <label
                    key={permission.name}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {permission.name}
                  </label>
                </div>
              ))}
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

export default CreateRolesAndPermissions;
