"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";

import { useForm } from "react-hook-form";
import { addUser } from "@/app/_services/apiAuth";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useRoles } from "@/app/_features/roles/useRoles";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { handleValidationError } from "@/app/_hooks/useHandleValidationError";
import SelectAdminUser from "./SelectAdminUser";
import SelectAdminUserForNew from "./SelectAdminUserForNew";

const NewUserModal = ({ btn }) => {
  const [open, setOpen] = useState(false);
  const { isLoading: isFetching, data } = useRoles();

  const queryClient = useQueryClient();
  const params = useSearchParams();

  const page = params.get("page") ? +params.get("page") : 1;

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting: isLoading },
  } = useForm();

  async function onSubmit(formData) {
    if (!formData.assign_to_admin) {
      return toast.error("Account manager is missing!");
    }
    try {
      const res = await addUser(formData);

      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries(["allUsers", page]);
        setOpen((open) => !open);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        err.response?.data?.data
          ? handleValidationError(err.response.data.data)
          : toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  }

  return (
    <Dialog
      className="bg-white"
      open={open}
      onOpenChange={() => setOpen((open) => !open)}
    >
      <DialogTrigger className="btn-primary px-6 py-1 text-base">
        {btn}
      </DialogTrigger>
      <DialogContent className="bg-white max-w-[50rem] max-h-dvh overflow-y-auto">
        <div className="flex items-center flex-1 flex-col justify-center lg:px-8 ">
          <div className="sm:py-4 w-full mx-auto sm:border sm:border-gray-200 sm:shadow-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
              <h2 className="font-serif mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
                Create new account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full px-8">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("firstname", {
                        required: "Please tell us your name",
                      })}
                      disabled={false}
                      type="text"
                      className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors?.firstname && (
                      <span className="text-red-500 text-sm">
                        {errors?.firstname.message}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("lastname")}
                      disabled={false}
                      type="text"
                      className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("email", {
                        required: "Please provide your email address",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Please provide a valid email address",
                        },
                      })}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors?.email && (
                      <span className="text-red-500 text-sm">
                        {errors?.email.message}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("phone", {
                        required: "Please provide your phone number",
                      })}
                      type="tel"
                      autoComplete="tel"
                      className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors?.phone && (
                      <span className="text-red-500 text-sm">
                        {errors?.phone.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    User Role
                  </label>
                  <select
                    {...register("role")}
                    type="text"
                    className="mt-2 block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  >
                    {!isFetching &&
                      data?.data?.rolesWithPermissions.map((role) => (
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

                <SelectAdminUserForNew setValue={setValue} />
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      {...register("password", {
                        required: "Please enter your password",
                        minLength: {
                          value: 8,
                          message: "Password needs a minimum of 8 characters",
                        },
                      })}
                      type="password"
                      className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors?.password && (
                      <span className="text-red-500 text-sm">
                        {errors?.password.message}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                      Password Confirm
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      {...register("password_confirmation", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === getValues().password ||
                          "Passwords need to match",
                      })}
                      name="password_confirmation"
                      type="password"
                      className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors?.password_confirmation && (
                      <span className="text-red-500 text-sm">
                        {errors?.password_confirmation.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="font-serif flex w-full justify-center rounded-md bg-color-primary text-white px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
                  >
                    {isLoading ? <SpinnerMini /> : "Sign up"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewUserModal;
