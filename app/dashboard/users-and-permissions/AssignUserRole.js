"use client";

import { useRoles } from "@/app/_features/roles/useRoles";
import toast from "react-hot-toast";
import { assignRole } from "@/app/_services/apiAuth";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AssignUserRole = ({ user }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading, data } = useRoles();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: user?.roles[0]?.name,
    },
  });

  async function onSubmit({ role_name }) {
    try {
      const res = await assignRole(user.id, role_name);

      if (res) {
        toast.success(res.message);

        queryClient.invalidateQueries("users");
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
      <DialogTrigger className="btn-primary transition-all py-1 bg-emerald-200">
        Assign Role
      </DialogTrigger>
      <DialogContent className="max-h-dvh overflow-y-scroll">
        <div>
          <h2 className="font-serif text-lg">Create new Role</h2>
          <p className="text-sm text-gray-800 mt-3">
            Make changes to your user role here. Click save when you're done.
          </p>
          <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Role Name
              </label>
              <div className="mt-2">
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
            </div>
            <div className="flex flex-wrap flex-col gap-2">
              <h1 className="mt-4 font-semibold font-serif">Permissions</h1>
              <div className="mb-2 flex flex-wrap gap-y-3 gap-x-4 items-center">
                {!isLoading &&
                  data?.data.permissions.map((permission) => {
                    // console.log(permission);
                    return (
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
                    );
                  })}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 font-serif flex justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
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

export default AssignUserRole;
