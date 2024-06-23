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
    watch,
    formState: { errors, isSubmitting: isLoading },
  } = useForm();

  const watchRole = watch("role");

  async function onSubmit({
    firstname,
    lastname,
    email,
    role,
    password,
    location,
    passwordConfirm,
  }) {
    try {
      const res = await addUser({
        firstname,
        lastname,
        email,
        role,
        password,
        location,
        password_confirmation: passwordConfirm,
      });

      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries(["allUsers", page]);
        setOpen((open) => !open);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        err.response.data.data
          ? toast.error(err.response.data.data.email)
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
      <DialogContent className="bg-white max-w-[50rem]">
        <div className="flex items-center flex-1 flex-col justify-center lg:px-8 ">
          <div className="sm:py-8 w-full mx-auto sm:border sm:border-gray-200 sm:shadow-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
              <h2 className="font-serif mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
                Create new account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[30rem]">
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
                    {errors?.firstName && (
                      <span className="text-red-500 text-sm">
                        {errors?.firstName.message}
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
                    {errors?.lastname && (
                      <span className="text-red-500 text-sm">
                        {errors?.lastname.message}
                      </span>
                    )}
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
                {watchRole === "dealer" && (
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
                        Location
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        {...register("location", {
                          required: "Please enter your location",
                        })}
                        type="text"
                        className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      {errors?.location && (
                        <span className="text-red-500 text-sm">
                          {errors?.location.message}
                        </span>
                      )}
                    </div>
                  </div>
                )}

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
                      {...register("passwordConfirm", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === getValues().password ||
                          "Passwords need to match",
                      })}
                      name="passwordConfirm"
                      type="password"
                      className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors?.passwordConfirm && (
                      <span className="text-red-500 text-sm">
                        {errors?.passwordConfirm.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="font-serif flex w-full justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
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
