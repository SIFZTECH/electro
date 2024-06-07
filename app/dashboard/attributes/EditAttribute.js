"use client";

import { updateCategory } from "@/app/_services/apiCategories";
import SpinnerMini from "@/app/components/ui/SpinnerMini";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const EditAttribute = ({ category }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: category.name || "" } });

  async function onSubmit(data) {
    try {
      const res = await updateCategory(category.id, data);

      if (res) {
        toast.success(res.data);
        queryClient.invalidateQueries("categories");
      }
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
    <Dialog>
      <DialogTrigger className="btn-primary transition-all py-1 border-color-primary">
        <span
          onClick={() =>
            router.push(`/dashboard/categories/?id=${category.id}`)
          }
        >
          Edit
        </span>
      </DialogTrigger>
      <DialogContent>
        <div>
          <h2 className="font-serif text-lg">Edit Category</h2>
          <p className="text-sm text-gray-800 mt-3">
            Make changes to your category here. Click save when you're done.
          </p>
          <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Category Name
              </label>
              <div className="mt-2">
                <input
                  {...register("name", {
                    required: "This filed is required",
                  })}
                  disabled={isSubmitting}
                  type="text"
                  className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {errors?.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
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
                {isSubmitting ? <SpinnerMini /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAttribute;
