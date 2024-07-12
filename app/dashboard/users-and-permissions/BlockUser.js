"use client";

import toast from "react-hot-toast";
import { userBlock } from "@/app/_services/apiAuth";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const BlockUser = ({ user }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  async function onSubmit() {
    try {
      let res;
      if (user.is_blocked === 0) {
        res = await userBlock(user.id, true);
      } else {
        res = await userBlock(user.id, false);
      }

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
      <DialogTrigger className="btn-primary text-white transition-all py-1 bg-red-500 hover:bg-red-400">
        {user?.is_blocked === 1 ? "Unblock" : "Block"}
      </DialogTrigger>
      <DialogContent>
        <div>
          <h2 className="font-serif text-xl">Block this User</h2>
          <div>
            <p className="mt-3">
              Are you sure you want to Block this user{" "}
              <span className="font-semibold">{user.name}</span>
            </p>
            <p className="text-sm text-gray-800 mt-3">
              This will Block your user.
            </p>
            <form className="flex gap-3 mt-6" onSubmit={handleSubmit(onSubmit)}>
              <DialogClose className="btn-primary text-color-primary bg-transparent border border-color-primary">
                Cencel
              </DialogClose>
              <button
                type="submit"
                className="btn-primary bg-red-500 text-white"
              >
                {isSubmitting ? (
                  <SpinnerMini />
                ) : user?.is_blocked === 1 ? (
                  "Unblock"
                ) : (
                  "Block"
                )}
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlockUser;
