"use client";

import { deleteAttributeValue } from "@/app/_services/apiAttributes";
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
import toast from "react-hot-toast";

const DeleteAttributeValue = ({ attribute }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit({ attribute_value_id }) {
    try {
      const res = await deleteAttributeValue(attribute_value_id);

      if (res) {
        toast.success(res.message);

        queryClient.invalidateQueries("attributes");
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
        Delete Value
      </DialogTrigger>
      <DialogContent>
        <div>
          <h2 className="font-serif text-xl">Delete Attribute Value</h2>
          <div>
            <p className="text-sm text-gray-800 mt-3">
              This will delete your Attribute permanently. You cannot undo this
              action.
            </p>
            <form className="flex gap-3 mt-6" onSubmit={handleSubmit(onSubmit)}>
              <select
                {...register("attribute_value_id")}
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
              >
                <option value="">Select Attribute Value</option>
                {attribute.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                    style={
                      item?.value.startsWith("#")
                        ? {
                            backgroundColor: item.value,
                            color: item.value,
                          }
                        : {}
                    }
                  >
                    {item.value}
                  </option>
                ))}
                {/* {attribute.map((key) => {
                  return attributes[key]
                    .filter((attr) => {
                      console.log(attr);
                      return (
                        !selectedVariantValues.includes(attr.id) ||
                        attr.id === Number(field.value)
                      );
                    })
                    .map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                        style={
                          key === "Color"
                            ? {
                                backgroundColor: item.value,
                                color: item.value,
                              }
                            : {}
                        }
                      >
                        {key} - {item.value}
                      </option>
                    ));
                })} */}
              </select>
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

export default DeleteAttributeValue;
