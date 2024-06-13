"use client";

import {
  useCategories,
  useCategory,
} from "@/app/_features/categories/useCategory";
import { useFieldArray, useForm } from "react-hook-form";
import SelectAttribute from "./SelectAttribute";
import { useBrands } from "@/app/_features/brands/useBrands";

import { RichTextInput } from "@tonz/react-draft-wysiwyg-input";
import "@tonz/react-draft-wysiwyg-input/style.css";
import Spinner from "@/app/components/ui/Spinner";
import SelectCategoryFormComponent from "./SelectCategory&SubCategory";
import SpecificationForm from "./SpecificationForm";
import toast from "react-hot-toast";
import { createProduct } from "@/app/_services/apiProducts";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { BiCloset } from "react-icons/bi";
import ImageUploader from "./SelectImages";

const ProductForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: brands, isLoading, isError } = useBrands();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      variants: [{ attribute_value_id: "", price: 0 }], // Default values
      specifications: [{ key: "", value: "", icon_path_value: "" }],
    },
  });

  async function onSubmit({
    name,
    price,
    introduction,
    stock,
    category_id,
    subcategory_id,
    brand_id,
    key_features,
    variants,
    specifications,
    images,
  }) {
    const keyFeatures = key_features.blocks.map((text) => text.text).join(",");
    try {
      const res = await createProduct({
        name,
        price,
        introduction,
        stock,
        category_id,
        subcategory_id,
        brand_id,
        key_features: keyFeatures,
        variants,
        specifications,
        images,
      });
      console.log(res);
      if (res) {
        toast.success("Product Created Successfull");
        queryClient.invalidateQueries("products");
        router.replace("/dashboard/product-specifications");
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast.error("There is error while creating product");
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <form className="md:py-8 p-2 md:px-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-x-9 gap-y-6">
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
            Price
          </label>
          <div className="mt-1">
            <input
              {...register("price", {
                required: "Price field must be filled",
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
        <div className="col-span-2">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
            Introduction
          </label>
          <div className="mt-1">
            <textarea
              {...register("introduction")}
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
        <div className="col-span-2">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
            Key Features
          </label>
          <div className="mt-1">
            <RichTextInput
              toolbar={{
                options: ["list", "textAlign"],
              }}
              wrapperClassName="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              toolbarClassName="bg-gray-100"
              disabled={isSubmitting}
              {...register("key_features")}
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
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
        <div className="flex items-center gap-8 ">
          <div className="flex-1">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Brand Name
            </label>
            <div className="mt-1">
              <select
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                {...register("brand_id")}
              >
                <option value="">--Please choose an option--</option>
                {!isLoading &&
                  brands.data.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
              </select>
              {errors?.brand && (
                <span className="text-red-500 text-sm">
                  {errors.brand.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <SelectCategoryFormComponent control={control} watch={watch} />

        <SelectAttribute watch={watch} control={control} />
        <ImageUploader register={register} errors={errors} />
        <SpecificationForm control={control} />
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
