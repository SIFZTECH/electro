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
import SelectAttribute from "../add-product/SelectAttribute";
import SpecificationForm from "../add-product/SpecificationForm";
import { RichTextInput } from "@tonz/react-draft-wysiwyg-input";
import "@tonz/react-draft-wysiwyg-input/style.css";
import { useBrands } from "@/app/_features/brands/useBrands";
import UpdateImageUploader from "./UpdateImage";
import SelectBrand from "../add-product/SelectBrand";
import SelectKeyFeatures from "../add-product/SelectKeyFeatures";

const EditProduct = ({ product }) => {
  const { data, isLoading, isError } = useBrands();
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
      name: product?.name || "",
      model_name: product?.model_name || "",
      price: product?.price || 0,
      introduction: product?.introduction || "",
      stock: product?.stock || "",
      category_id: product?.category_id || "",
      subcategory_id: product?.subcategory_id || "",
      brand_id: product?.brand_id || "",
      key_features: product?.specification || [],
      variants: product?.variants
        ? product.variants
        : [{ attribute_value_id: "", price: 0 }],
      products: product?.compare ? product.compare : [{ id: "" }],
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
    products,
  }) {
    try {
      const res = await updateProduct(product.id, {
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
        compare: products,
      });
      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("product", product.slug);
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
      <DialogTrigger className="btn-primary transition-all py-1">
        Edit Product
      </DialogTrigger>
      <DialogContent className="max-w-[80rem]">
        <div>
          <h2 className="font-serif text-lg">Edit This Product</h2>
        </div>
        <form className="md:py-8 p-2 md:px-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-9 gap-y-6">
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

            {/* <div className="flex items-center gap-8 ">
              <div className="flex-1">
                <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
                  Brand Name
                </label>
                <div className="mt-1">
                  <select
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    {...register("brand_id")}
                  >
                    {!isLoading &&
                      data?.data?.map((brand) => (
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
            </div> */}
            <SelectBrand register={register} errors={errors} />

            <SelectCategoryFormComponent control={control} watch={watch} />
            <SelectKeyFeatures control={control} />

            <SelectAttribute watch={watch} control={control} />
            <UpdateImageUploader
              register={register}
              errors={errors}
              setValue={setValue}
            />
            <SpecificationForm control={control} />
          </div>
          <button
            type="submit"
            className="btn-primary mt-5 font-semibold rounded-sm px-6 py-2"
          >
            {isSubmitting ? <SpinnerMini /> : `Update ${product.name}`}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
