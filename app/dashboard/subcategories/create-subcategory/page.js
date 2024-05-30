"use client";

import { useToast } from "@/app/_hooks/use-toast";
import { createSubcategory } from "@/app/_services/apiSubcategories";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const Test = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit({ name, category_id }) {
    try {
      const res = await createSubcategory({ name, category_id });

      console.log(res);

      if (res) {
        toast({
          variant: "success",
          title: res.message,
          duration: 1000,
        });

        queryClient.invalidateQueries("subcategories");
        router.replace("/dashboard/subcategories");
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
    <div className="w-1/2">
      <h2 className="font-serif text-lg font-semibold">
        Create new Sub-Category
      </h2>
      <p className="text-sm text-gray-800 mt-3">
        Create new Sub-category. Click save when you're done.
      </p>
      <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Sub-Category Name
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
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Category Id
          </label>
          <div className="mt-2">
            <input
              {...register("category_id", {
                required: "This filed is required",
              })}
              disabled={isSubmitting}
              type="number"
              className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.category_id && (
              <span className="text-red-500 text-sm">
                {errors.category_id.message}
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
            {isSubmitting ? <SpinnerMini /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Test;
