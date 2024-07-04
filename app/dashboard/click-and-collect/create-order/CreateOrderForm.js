"use client";

import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { handleValidationError } from "@/app/_hooks/useHandleValidationError";
import SelectProduct from "./SelectProduct";
import SelectAttribute from "./SelectAttribute";
import { createOrder } from "@/app/_services/apiOrders";
import { useProducts } from "@/app/_features/products/useProducts";
import { useEffect, useState } from "react";

const CreateOrderForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { products, isError, isLoading } = useProducts();
  const [productPrice, setProductPrice] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      product_id: "",
      quantity: 1,
      variants: [{ attribute: "", attribute_value: "" }],
    },
  });

  const selectedProductId = useWatch({ control, name: "product_id" });
  const selectedVariant = useWatch({ control, name: "variant" });
  const selectedQuantity = useWatch({ control, name: "quantity" });

  useEffect(() => {
    if (products && selectedProductId) {
      const product = products.data.data.find(
        (p) => p.id === parseInt(selectedProductId)
      );
      if (product) {
        const basePrice = parseFloat(product.price);
        setProductPrice(basePrice);

        const variant = product.variants.find(
          (v) =>
            v.attribute_value_id === parseInt(selectedVariant?.attribute_value)
        );

        const variantPrice = variant ? parseFloat(variant.price) : 0;
        setValue("product_price", basePrice + variantPrice);
        const totalPrice =
          (basePrice + variantPrice) * Number(selectedQuantity);
        setValue("total", totalPrice);
      } else {
        setProductPrice(0);
        setValue("product_price", 0);
        setValue("total", 0);
      }
    }
  }, [
    selectedProductId,
    selectedVariant,
    selectedQuantity,
    products,
    setValue,
  ]);

  async function onSubmit(formData) {
    try {
      const res = await createOrder(formData);

      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("orders");
        router.back(-1);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        err.response?.data?.data
          ? handleValidationError(err.response.data.data)
          : toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <>
      <h1 className="md:px-6 font-serif text-2xl font-semibold">
        Create New Order
      </h1>
      <form className="md:py-8 p-2 md:px-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-x-9 gap-y-6">
          <SelectProduct
            register={register}
            products={products}
            isLoading={isLoading}
            isError={isError}
          />
          <SelectAttribute control={control} setValue={setValue} />
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Product Price
            </label>
            <div className="mt-1">
              <input
                {...register("product_price", {
                  required: "This is required field",
                })}
                type="number"
                placeholder="Product Price"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.product_price && (
                <span className="text-red-500 text-sm">
                  {errors.product_price.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Quantity
            </label>
            <div className="mt-1">
              <input
                {...register("quantity", {
                  required: "This is required field",
                })}
                type="number"
                placeholder="Quantity"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.quantity && (
                <span className="text-red-500 text-sm">
                  {errors.quantity.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Customer Name
            </label>
            <div className="mt-1">
              <input
                {...register("customer_name", {
                  required: "This is required field",
                })}
                type="text"
                placeholder="Customer Name"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.customer_name && (
                <span className="text-red-500 text-sm">
                  {errors.customer_name.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Customer Email
            </label>
            <div className="mt-1">
              <input
                {...register("customer_email", {
                  required: "This is required field",
                })}
                type="email"
                placeholder="Customer Email"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.customer_email && (
                <span className="text-red-500 text-sm">
                  {errors.customer_email.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Customer Address
            </label>
            <div className="mt-1">
              <input
                {...register("customer_address", {
                  required: "This is required field",
                })}
                type="text"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.customer_address && (
                <span className="text-red-500 text-sm">
                  {errors.customer_address.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Customer City
            </label>
            <input
              {...register("customer_city", {
                required: "This is required field",
              })}
              type="text"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.customer_city && (
              <span className="text-red-500 text-sm">
                {errors.customer_city.message}
              </span>
            )}
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 required-field">
              Customer Postal Code
            </label>
            <div className="mt-1">
              <input
                {...register("customer_post_code", {
                  required: "This is required field",
                })}
                type="number"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.customer_post_code && (
                <span className="text-red-500 text-sm">
                  {errors.customer_post_code.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Customer Phone
            </label>
            <div className="mt-1">
              <input
                {...register("customer_phone_number", {
                  required: "This is required field",
                })}
                type="tel"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.customer_phone_number && (
                <span className="text-red-500 text-sm">
                  {errors.customer_phone_number.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Courier Name
            </label>
            <div className="mt-1">
              <input
                {...register("courier_name")}
                type="text"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {/* {errors?.courier_name && (
                <span className="text-red-500 text-sm">
                  {errors.courier_name.message}
                </span>
              )} */}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Country
            </label>
            <div className="mt-1">
              <input
                {...register("country", {
                  required: "This is required field",
                })}
                type="text"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.country && (
                <span className="text-red-500 text-sm">
                  {errors.country.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Total
            </label>
            <div className="mt-1">
              <input
                {...register("total", {
                  required: "This is required field",
                })}
                type="number"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.total && (
                <span className="text-red-500 text-sm">
                  {errors.total.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary my-8"
        >
          {isSubmitting ? <SpinnerMini /> : "Create Order"}
        </button>
      </form>
    </>
  );
};

export default CreateOrderForm;
