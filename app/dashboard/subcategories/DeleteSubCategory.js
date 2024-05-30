"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useState } from "react";

const DeleteSubCategory = () => {
  const [open, setOpen] = useState(false);

  async function handleClick() {
    try {
      const id = params.get("id");

      const res = await deleteSubcategory(id);

      if (res) {
        toast({
          variant: "success",
          title: res.message,
          duration: 1000,
        });
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="hover:bg-gray-100 transition-all py-1">
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
            <div className="flex gap-3 mt-6">
              <button className="btn-primary bg-transparent border border-gray-900">
                Cencel
              </button>
              <button
                className="btn-primary bg-red-500 text-white"
                onClick={handleClick}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSubCategory;
