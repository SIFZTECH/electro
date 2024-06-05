"use client";

import { useToast } from "@/app/_hooks/use-toast";
import { changePassword } from "@/app/_services/apiAuth";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useForm } from "react-hook-form";

const ChangePasswordForm = ({ open, setOpen }) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit({ currentPassword, password, confirmPassword }) {
    try {
      const res = await changePassword({
        old_password: currentPassword,
        new_password: password,
        new_password_confirmation: confirmPassword,
      });

      if (res) {
        toast({
          variant: "success",
          title: res.message,
          duration: 1000,
        });
      }
      setOpen((open) => !open);
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
      <DialogContent>
        <p>Click change when you're done.</p>
        <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Enter your current password
            </label>
            <div className="mt-2">
              <input
                {...register("currentPassword", {
                  required: "This filed is required",
                })}
                disabled={isSubmitting}
                type="password"
                className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.currentPassword && (
                <span className="text-red-500 text-sm">
                  {errors.currentPassword.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              New password
            </label>
            <div className="mt-2">
              <input
                {...register("password", {
                  required: "This filed is required",
                })}
                disabled={isSubmitting}
                type="password"
                className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Confirm password
            </label>
            <div className="mt-2">
              <input
                {...register("confirmPassword", {
                  required: "This filed is required",
                  validate: (value) =>
                    value === getValues().password || "Passwords need to match",
                })}
                disabled={isSubmitting}
                type="password"
                className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 font-serif flex justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
            >
              {isSubmitting ? <SpinnerMini /> : "Change Password"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordForm;
