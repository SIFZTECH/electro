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

const ProductForm = () => {
  const { isLoading, data, isError } = useCategories();
  const {
    data: brands,
    isLoading: isLoading3,
    isError: isError3,
  } = useBrands();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    variants: [
      { attributeName: "", attributeValue: "" },
      { attributeName: "", attributeValue: "" },
    ],
  });

  const watchCategoryId = watch("category_id");

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useCategory(watchCategoryId);

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control,
  });

  function onSubmit(data) {
    console.log(data);
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
            {/* <textarea
              {...register("keyFeatures")}
              type="text"
              placeholder="Key Features"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            /> */}
            {/* <Editor
              wrapperClassName="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              toolbarClassName="bg-gray-100"
              toolbar={{
                options: ["list", "textAlign"],
              }}
            /> */}
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
              type="text"
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
                {!isLoading3 &&
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
        <div className="flex items-center gap-8 col-span-2">
          <div className="flex-1">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Category
            </label>
            <div className="mt-1">
              <select
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                {...register("category_id")}
              >
                <option value="0">--Please choose an option--</option>
                {!isLoading &&
                  data.data.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
              {errors?.category_id && (
                <span className="text-red-500 text-sm">
                  {errors.category_id.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Sub-Category
            </label>
            <select
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
              {...register("subcategory_id")}
            >
              <option value="">--Please choose an option--</option>
              {!isLoading2 &&
                data2?.data?.subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
            </select>
            {errors?.subcategory_id && (
              <span className="text-red-500 text-sm">
                {errors.subcategory_id.message}
              </span>
            )}
          </div>
        </div>

        <SelectAttribute register={register} control={control} />

        <div className="col-span-2">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Images
          </label>
          <div className="mt-1">
            <input
              {...register("images", {
                required: "This field must be filled",
              })}
              type="file"
              multiple
              placeholder="Select your Images"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.images && (
              <span className="text-red-500 text-sm">
                {errors.images.message}
              </span>
            )}
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
            Specification
          </label>
          <div className="mt-1">
            <textarea
              {...register("specification")}
              type="text"
              placeholder="Specification"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="btn-primary mt-5 font-semibold rounded-sm px-6 py-2"
      >
        Save
      </button>
    </form>
  );
};

export default ProductForm;
