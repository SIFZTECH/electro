"use client";

import { updateProduct } from "@/app/_services/apiProducts";
import SpinnerMini from "@/app/components/ui/SpinnerMini";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SelectCategoryFormComponent from "../add-product/SelectCategory&SubCategory";
import UpdateImageUploader from "./UpdateImage";
import SelectBrand from "../add-product/SelectBrand";
import SelectKeyFeatures from "../add-product/SelectKeyFeatures";
import { handleValidationError } from "@/app/_hooks/useHandleValidationError";
import UpdateAttribute from "./UpdateAttribute";
import ManageImage from "./ManageImage";

const EditProduct = ({ product }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: product ? product?.name : "",
      model_name: product ? product?.model_name : "",
      price: product ? product?.price : 0,
      introduction: product ? product?.introduction : "",
      stock: product ? product?.stock : "",
      category_id: product ? product?.category_id : "",
      subcategory_id: product ? product?.subcategory_id : "",
      brand_id: product ? product?.brand_id : "",
      status: product?.status,
      sku: product?.sku,
      key_features: product ? product?.specification : [],
      variants: product ? product?.variants : [],
      images: product ? product?.images : [],
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

    images,
  }) {
    const formattedVariants = variants.map((variant) => {
      return {
        attribute_value_id: variant.attribute_value_id,
        price: variant.price,
      };
    });

    try {
      const res = await updateProduct(product.id, {
        name,
        model_name,
        price,
        introduction,
        stock,
        category_id,
        subcategory_id,
        status,
        sku,
        brand_id,
        variants: formattedVariants,
        specification: key_features,
        images,
      });

      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("product", product.slug);
        setOpen((open) => !open);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        err?.response?.data?.data
          ? handleValidationError(err.response.data.data)
          : toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
      <DialogTrigger className="btn-primary transition-all py-1">
        Edit Product
      </DialogTrigger>
      <DialogContent className="max-w-[80rem] mt-24 xl:mt-0">
        <div>
          <h2 className="font-serif text-lg">Edit This Product</h2>
        </div>
        <form className="md:py-8 p-2 md:px-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-x-9 gap-y-6">
            <div className="">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
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
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
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
            <div>
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

            <SelectBrand register={register} errors={errors} />

            <SelectCategoryFormComponent control={control} watch={watch} />
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
                  <span className="text-red-500 text-sm">
                    {errors.sku.message}
                  </span>
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

            <UpdateAttribute
              watch={watch}
              control={control}
              productId={product?.id}
            />
            <ManageImage images={product?.images} slug={product?.slug} />
            <UpdateImageUploader
              register={register}
              errors={errors}
              setValue={setValue}
            />
          </div>
          <button
            type="submit"
            className="btn-primary mt-5 font-semibold rounded-sm px-6 py-2"
          >
            {isSubmitting ? <SpinnerMini /> : `Update`}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
