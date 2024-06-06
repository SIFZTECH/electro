"use client";

import { useRoles } from "@/app/_features/roles/useRoles";
import { useToast } from "@/app/_hooks/use-toast";
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
  const { toast } = useToast();
  const { data, isLoading } = useRoles();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      role_name: user?.roles[0].name,
    },
  });

  async function onSubmit({ role_name }) {
    try {
      const res = await assignRole(user.id, role_name);

      if (res) {
        toast({
          variant: "success",
          title: res.message,
          duration: 1000,
        });

        queryClient.invalidateQueries("users");
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
      <DialogTrigger className="btn-primary transition-all py-1 border-color-primary">
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
                <select
                  {...register("role_name")}
                  disabled={isSubmitting}
                  type="text"
                  className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                >
                  {!isLoading &&
                    data?.data.map((role) => (
                      <option
                        className="capitalize"
                        key={role.id}
                        value={role.name}
                      >
                        {role.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* <div>
              <h1 className="mt-4 font-semibold text-lg font-serif">
                Perimissions
              </h1>
              <div className="mt-2 flex gap-2 items-center">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Click and Collect
                </label>
                <input type="checkbox" {...register("click")} />
              </div>
              <div className="mt-2 flex gap-2 items-center">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Click and Collect
                </label>
                <input type="checkbox" {...register("click")} />
              </div>
              <div className="mt-2 flex gap-2 items-center">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Click and Collect
                </label>
                <input type="checkbox" {...register("click")} />
              </div>
              <div className="mt-2 flex gap-2 items-center">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Click and Collect
                </label>
                <input type="checkbox" {...register("click")} />
              </div>
              <div className="mt-2 flex gap-2 items-center">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Click and Collect
                </label>
                <input type="checkbox" {...register("click")} />
              </div>

              <div className="mt-2 flex gap-2 items-center">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Click and Collect
                </label>
                <input type="checkbox" {...register("click")} />
              </div>
              <div className="mt-2 flex gap-2 items-center">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Click and Collect
                </label>
                <input type="checkbox" {...register("click")} />
              </div>
              <div className="mt-2 flex gap-2 items-center">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Click and Collect
                </label>
                <input type="checkbox" {...register("click")} />
              </div>
              <div className="mt-2 flex gap-2 items-center">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Click and Collect
                </label>
                <input type="checkbox" {...register("click")} />
              </div>
              <div className="mt-2 flex gap-2 items-center">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Click and Collect
                </label>
                <input type="checkbox" {...register("click")} />
              </div>
              <div className="mt-2 flex gap-2 items-center">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Click and Collect
                </label>
                <input type="checkbox" {...register("click")} />
              </div>
              <div className="mt-2 flex gap-2 items-center">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Click and Collect
                </label>
                <input type="checkbox" {...register("click")} />
              </div>
              <div className="mt-2 flex gap-2 items-center">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Click and Collect
                </label>
                <input type="checkbox" {...register("click")} />
              </div>
            </div> */}
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
