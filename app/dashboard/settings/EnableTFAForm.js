"use client";

import { useToast } from "@/app/_hooks/use-toast";
import { enableTwoFactorAuth } from "@/app/_services/apiAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/app/components/ui/dialog";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { duration } from "moment";
import { useForm } from "react-hook-form";

const EnableTFAForm = ({ open, setOpen }) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  async function onSubmit({ password }) {
    try {
      const res = await enableTwoFactorAuth(password);
      console.log(res);
      if (res) {
        toast({
          variant: "destructive",
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
        <p>Click save when you're done.</p>
        <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Enter your password
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
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 font-serif flex justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
            >
              {isSubmitting ? <SpinnerMini /> : "Enable"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnableTFAForm;
