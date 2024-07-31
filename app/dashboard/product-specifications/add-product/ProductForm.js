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
    clearErrors,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      variants: [{ attribute_value_id: "", price: 0 }], // Default values
      key_features: [{ key_feature_id: "", value: "" }],
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
    status,
    sku,
    key_features,
    variants,
    specification,
    images,
    misc13,
  }) {
    try {
      if (!brand_id) {
        return toast.error("Brand is Missing!");
      } else if (!category_id) {
        return toast.error("Category is Missing!");
      }

      const fotmattedFeatures = key_features.map((feature) => {
        return {
          key_feature_id: Number(feature.key_feature_id),
          value: feature.value,
        };
      });

      const res = await createProduct({
        name,
        model_name,
        price,
        introduction,
        stock,
        category_id,
        subcategory_id,
        brand_id,
        status,
        sku,
        variants,
        key_features: fotmattedFeatures,
        images,
        misc13: misc13 === true ? 1 : 0,
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

        <SelectBrand setValue={setValue} />
        <SelectCategoryFormComponent
          control={control}
          watch={watch}
          errors={errors}
          setValue={setValue}
        />

        <div className="">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            SKU
          </label>
          <div className="mt-1">
            <input
              {...register("sku", {
                required: "This is required field.",
              })}
              placeholder="SKU"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.sku && (
              <span className="text-red-500 text-sm">{errors.sku.message}</span>
            )}
          </div>
        </div>
        <div className="">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
            Status
          </label>
          <div className="mt-1">
            <select
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              {...register("status")}
            >
              [Active,Inactive,Out of
              Stock,Discontinued,Pending,Draft,Pre-order,Backorder,On
              Hold,Featured,Custom]
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Discontinued">Discontinued</option>
              <option value="Draft">Draft</option>
              <option value="Pre-order">Pre-order</option>
              <option value="Backorder">Backorder</option>
              <option value="On Hold">On Hold</option>
              <option value="Featured">Featured</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>
        <SelectKeyFeatures control={control} />

        <SelectAttribute control={control} errors={errors} />
        <ImageUploader
          register={register}
          errors={errors}
          setValue={setValue}
          clearErrors={clearErrors}
        />
        <div className="flex gap-2 items-center">
          <input {...register("misc13")} id="misc" type="checkbox" />
          <label
            htmlFor="misc"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900 cursor-pointer"
          >
            Misc13
          </label>
        </div>
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
