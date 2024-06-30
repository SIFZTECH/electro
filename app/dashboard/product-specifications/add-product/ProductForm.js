"use client";

import { useForm } from "react-hook-form";
import SelectAttribute from "./SelectAttribute";

import SelectCategoryFormComponent from "./SelectCategory&SubCategory";
import toast from "react-hot-toast";
import { createProduct } from "@/app/_services/apiProducts";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ImageUploader from "./SelectImages";
import SelectBrand from "./SelectBrand";
import SelectKeyFeatures from "./SelectKeyFeatures";
import { handleValidationError } from "@/app/_hooks/useHandleValidationError";

const ProductForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    setValue,

    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      variants: [{ attribute_value_id: "", price: 0 }], // Default values
      key_features: [{ key: "", value: "" }],
    },
  });

  async function onSubmit({
    name,
    model_name,
    price,
    introduction,
    stock,
    category_id,
    subcategory_id,
    brand_id,
    key_features,
    variants,
    specification,
    images,
  }) {
    try {
      const res = await createProduct({
        name,
        model_name,
        price,
        introduction,
        stock,
        category_id,
        subcategory_id,
        brand_id,
        variants,
        specification: key_features,
        images,
      });

      if (res) {
        toast.success("Product Created Successfull");
        queryClient.invalidateQueries("products");
        router.replace("/dashboard/product-specifications");
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        handleValidationError(err.response.data.errors);
      } else {
        toast.error(err.message);
      }
    }
  }

  return (
    <form className="py-8 p-3 md:px-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-x-9 gap-y-6">
        <div className="">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Product Name
          </label>
          <div className="mt-1">
            <input
              {...register("name", {
                required: "Product Name field must be filled",
              })}
              type="text"
              placeholder="Product Name"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>
        <div className="">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Model Name
          </label>
          <div className="mt-1">
            <input
              {...register("model_name", {
                required: "Product Name field must be filled",
              })}
              type="text"
              placeholder="Model Name"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.model_name && (
              <span className="text-red-500 text-sm">
                {errors.model_name.message}
              </span>
            )}
          </div>
        </div>
        <div className="">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Stock
          </label>
          <div className="mt-1">
            <input
              {...register("stock", {
                required: "Stock field must be filled",
              })}
              type="number"
              placeholder="Stock"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.stock && (
              <span className="text-red-500 text-sm">
                {errors.stock.message}
              </span>
            )}
          </div>
        </div>
        <div className="">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Price
          </label>
          <div className="mt-1">
            <input
              {...register("price", {
                required: "This is required field.",
              })}
              type="number"
              placeholder="Price"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.price && (
              <span className="text-red-500 text-sm">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>
        <div className="">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Introduction
          </label>
          <div className="mt-1">
            <textarea
              {...register("introduction", {
                required: "This is required field.",
              })}
              type="text"
              placeholder="Introduction"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.introduction && (
              <span className="text-red-500 text-sm">
                {errors.introduction.message}
              </span>
            )}
          </div>
        </div>
        <SelectBrand register={register} errors={errors} />
        <SelectCategoryFormComponent control={control} watch={watch} />
        <SelectKeyFeatures control={control} />

        <SelectAttribute control={control} />
        <ImageUploader
          register={register}
          errors={errors}
          setValue={setValue}
        />
      </div>
      <button
        type="submit"
        className="btn-primary mt-5 font-semibold rounded-sm px-6 py-2"
      >
        {isSubmitting ? <SpinnerMini /> : "Create"}
      </button>
    </form>
  );
};

export default ProductForm;
