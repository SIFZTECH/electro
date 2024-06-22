"use client";

import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useState } from "react";
import { createAttributeValue } from "@/app/_services/apiAttributes";
import { useAttributeNames } from "@/app/_features/attributes/useAttributes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Spinner from "@/app/components/ui/Spinner";
import { handleValidationError } from "@/app/_hooks/useHandleValidationError";

const CreateNewAttributeValue = () => {
  const [color, setColor] = useState("#000000");
  const [attributeName, setattributeName] = useState(null);

  const [open, setOpen] = useState();
  const router = useRouter();
  const { data, isLoading, isError } = useAttributeNames();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit({ value, attribute_id }) {
    try {
      const res = await createAttributeValue({ value, attribute_id });

      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("attributes");
        router.replace("/dashboard/attributes");
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        err.response?.data?.data
          ? handleValidationError(err.response?.data?.data)
          : toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleAttributeChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const attributeName = selectedOption.getAttribute("data-name");
    setattributeName(attributeName);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Dialog defaultOpen onOpenChange={() => router.back(-1)}>
      <DialogTrigger className="btn-primary">Add New Attribute</DialogTrigger>
      <DialogContent>
        <div>
          <h2 className="font-serif text-lg font-semibold">
            Create new Attribute Value
          </h2>
          <p className="text-sm text-gray-800 mt-3">
            Create new Attribute Value. Click create when you're done.
          </p>
          <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Attribute Value
              </label>
              <div className="mt-2">
                {attributeName === "Color" ? (
                  <div className="font-serif text-sm flex flex-col gap-2">
                    <div className="flex justify-start items-center">
                      <label
                        htmlFor="color-code"
                        className="mr-2 btn-primary bg-emerald-200"
                      >
                        Get your color code
                      </label>
                      <input
                        {...register("value", {
                          required: "This filed is required",
                        })}
                        id="color-code"
                        type="color"
                        onChange={handleColorChange}
                      />
                    </div>
                    <p className="flex-1">Selected Color Hex Value: {color}</p>
                  </div>
                ) : (
                  <input
                    {...register("value", {
                      required: "This filed is required",
                    })}
                    disabled={isSubmitting}
                    type="text"
                    className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                )}

                {errors?.value && (
                  <span className="text-red-500 text-sm">
                    {errors.value.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Attribute Name
              </label>
              <div className="mt-2">
                <select
                  {...register("attribute_id", {
                    required: "This is required field",
                  })}
                  disabled={isSubmitting}
                  type="text"
                  onChange={handleAttributeChange}
                  className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                >
                  <option value="">--Please choose one--</option>
                  {data?.data?.map((attribute) => {
                    console.log(attribute);
                    return (
                      <option
                        className="capitalize"
                        key={attribute?.id}
                        defaultValue={attribute?.id}
                        value={attribute?.id}
                        data-name={attribute.name}
                      >
                        {attribute.name}
                      </option>
                    );
                  })}
                </select>
                {errors?.attribute_id && (
                  <span className="text-red-500 text-sm">
                    {errors.attribute_id.message}
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
                {isSubmitting ? <SpinnerMini /> : "Create"}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewAttributeValue;
