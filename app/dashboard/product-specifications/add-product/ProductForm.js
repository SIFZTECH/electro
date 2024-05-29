"use client";

import { useForm } from "react-hook-form";

const ProductForm = () => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useForm();

  return (
    <form className="md:py-8 p-2 md:px-6 ">
      <div className="flex flex-wrap flex-col md:flex-row gap-x-9 gap-y-6">
        <div className="md:basis-[45%]">
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
        <div className="md:basis-[45%]">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
            Introduction
          </label>
          <div className="mt-1">
            <input
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
        <div className="md:basis-[92%]">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
            Key Features
          </label>
          <div className="mt-1">
            <textarea
              {...register("key_features")}
              name="text"
              placeholder="Key Features"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="md:basis-[45%]">
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

        <div className="md:basis-[45%]">
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
        <div className="md:basis-[45%]">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Category Id
          </label>
          <div className="mt-1">
            <input
              {...register("category_id", {
                required: "This field must be filled",
              })}
              type="number"
              placeholder="Category Id"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.category_id && (
              <span className="text-red-500 text-sm">
                {errors.category_id.message}
              </span>
            )}
          </div>
        </div>
        <div className="md:basis-[45%]">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Sub-Category Id
          </label>
          <input
            {...register("subcategory_id", {
              required: "This field must be filled",
            })}
            type="number"
            placeholder="Sub-Category Id"
            className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
          {errors?.subcategory_id && (
            <span className="text-red-500 text-sm">
              {errors.subcategory_id.message}
            </span>
          )}
        </div>

        <div className="md:basis-[45%]">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
            Variants
          </label>
          <div className="mt-1">
            <input
              {...register("variants", {
                required: "This field must be filled",
              })}
              placeholder="attribute_value_id: 4 price: 120 - attribute_value_id: 5 price: 120 - attribute_value_id: 6 price: 120"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="md:basis-[45%]">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Images
          </label>
          <div className="mt-1">
            <input
              {...register("images", {
                required: "This field must be filled",
              })}
              type="file"
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
        <div className="md:basis-[92%]">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
            Specification
          </label>
          <div className="mt-1">
            <textarea
              {...register("specification", {
                required: "This field must be filled",
              })}
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
