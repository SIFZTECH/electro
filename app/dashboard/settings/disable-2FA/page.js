"use client";

import { useUser } from "@/app/_features/authentication/useUser";
import { disbleTwoFactorAuth } from "@/app/_services/apiAuth";
import { Dialog, DialogClose, DialogContent } from "@/app/components/ui/dialog";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DisableTwoFa = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit() {
    try {
      const res = await disbleTwoFactorAuth();

      if (res) {
        toast.success(res.message);
      }
      router.replace("/dashboard/settings");
      queryClient.invalidateQueries("user");
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
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent>
        <div>
          <h2 className="font-serif text-xl">
            Disable Two-Factor Authentication
          </h2>
          <div>
            <p className="mt-3">
              Are you sure you want to disable Two-Factor Authentication
            </p>
            <p className="text-sm text-gray-800 mt-3">
              This will disable Two-Factor Authentication
            </p>
            <form className="flex gap-3 mt-6" onSubmit={handleSubmit(onSubmit)}>
              <DialogClose className="btn-primary bg-transparent border border-gray-900">
                Cencel
              </DialogClose>
              <button
                type="submit"
                className="btn-primary bg-red-500 text-white"
              >
                {isSubmitting ? <SpinnerMini /> : "Disable"}
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisableTwoFa;
