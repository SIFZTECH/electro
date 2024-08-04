"use client";

import { useRoles } from "@/app/_features/roles/useRoles";
import toast from "react-hot-toast";
import { updateUser } from "@/app/_services/apiAuth";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SelectAdminUser from "./SelectAdminUser";

const EditUser = ({ user }) => {
  const [open, setOpen] = useState();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useRoles();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      phone: user?.phone_number,
      user_role: user?.roles[0]?.name,
      city: user?.city,
      state: user?.state,
      address_line: user?.address_line,
      address_line1: user?.address_line1,
      assign_to_admin: user?.access_to_admin,
    },
  });

  async function onSubmit(formData) {
    try {
      const res = await updateUser(user.id, formData);

      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("users");
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
      <DialogTrigger className="btn-primary transition-all py-1 bg-color-primary">
        Edit
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <div>
          <h2 className="font-serif text-xl font-semibold">Edit User</h2>
          <p className="text-sm text-gray-800 mt-3">
            Make changes to your user here. Click save when you&apos;re done.
          </p>
          <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  {...register("firstname")}
                  disabled={isSubmitting}
                  type="text"
                  className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  {...register("lastname")}
                  disabled={isSubmitting}
                  type="text"
                  className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  {...register("email")}
                  disabled={isSubmitting}
                  type="text"
                  className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  {...register("phone")}
                  disabled={isSubmitting}
                  type="text"
                  className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
                User Role
              </label>
              <div className="mt-1">
                {!isLoading && (
                  <select
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    {...register("user_role")}
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
            <div className="grid grid-cols-2 gap-3">
              <div className="">
                <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                  State
                </label>
                <div className="mt-1">
                  <select
                    {...register("state", {
                      required: "This field is required",
                    })}
                    placeholder="State"
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  >
                    <option value="">--Select State--</option>
                    <option value="QA">QA</option>
                    <option value="TAS">TAS</option>
                    <option value="NSW">NSW</option>
                    <option value="VIC">VIC</option>
                    <option value="WA">WA</option>
                    <option value="SA">SA</option>
                    <option value="NA">NA</option>
                    <option value="ACT">ACT</option>
                  </select>
                  {errors?.state && (
                    <span className="text-red-500 text-sm">
                      {errors.state.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="">
                <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                  City
                </label>
                <div className="mt-1">
                  <input
                    {...register("city", {
                      required: "This field is required",
                    })}
                    type="text"
                    placeholder="City"
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {errors?.city && (
                    <span className="text-red-500 text-sm">
                      {errors.city.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="">
                <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                  Address Line 1
                </label>
                <div className="mt-1">
                  <input
                    {...register("address_line", {
                      required: "This field is required",
                    })}
                    type="text"
                    placeholder="Address Line 1"
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {errors?.address_line && (
                    <span className="text-red-500 text-sm">
                      {errors.address_line.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="">
                <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
                  Address Line 2
                </label>
                <div className="mt-1">
                  <input
                    {...register("address_line1")}
                    type="text"
                    placeholder="Address Line 2"
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  {...register("password")}
                  disabled={isSubmitting}
                  type="password"
                  className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <SelectAdminUser user={user} setValue={setValue} />

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 font-serif flex justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-color-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
              >
                {isSubmitting ? <SpinnerMini /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
