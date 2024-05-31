"use client";

import { useToast } from "@/app/_hooks/use-toast";
import { deleteCategory } from "@/app/_services/apiCategories";
import SpinnerMini from "@/app/components/ui/SpinnerMini";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const DeleteCategory = ({ category }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: category.name || "" } });

  async function onSubmit() {
    try {
      const res = await deleteCategory(category.id);

      if (res) {
        toast({
          variant: "success",
          title: res.message,
          duration: 1000,
        });

        queryClient.invalidateQueries("categories");
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
    <Dialog>
      <DialogTrigger className="btn-primary text-white transition-all py-1 bg-red-500 hover:bg-red-400">
        Delete
      </DialogTrigger>
      <DialogContent>
        <div>
          <h2 className="font-serif text-xl">Delete Category</h2>
          <div>
            <p className="mt-3">
              Are you sure you want to delete this cartegory #Name
            </p>
            <p className="text-sm text-gray-800 mt-3">
              This will delete your category permanently. You cannot undo this
              action.
            </p>
            <form className="flex gap-3 mt-6" onSubmit={handleSubmit(onSubmit)}>
              <DialogClose className="btn-primary bg-transparent border border-gray-900">
                Cencel
              </DialogClose>
              <button
                type="submit"
                className="btn-primary bg-red-500 text-white"
              >
                {isSubmitting ? <SpinnerMini /> : "Delete"}
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategory;
