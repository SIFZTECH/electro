"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useForm } from "react-hook-form";

const EditPermission = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  return (
    <Dialog>
      <DialogTrigger className="btn-primary transition-all py-1 border-color-primary">
        Edit
      </DialogTrigger>
      <DialogContent>
        <div>
          <h2 className="font-serif text-lg">Edit Role</h2>
          <p className="text-sm text-gray-800 mt-3">
            Click save when you're done.
          </p>
          <form className="space-y-3 mt-4">
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
                <select
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  {...register("user_role")}
                >
                  <option value="0">Admin</option>
                  <option value="0">Dealer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Status
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  {...register("user_role")}
                >
                  <option value="0">Active</option>
                  <option value="0">InActive</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 font-serif flex justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
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

export default EditPermission;
