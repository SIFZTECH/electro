"use client";

import React, { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { useProducts } from "@/app/_features/products/useProducts";

function SelectAttribute({ control, setValue }) {
  const { products } = useProducts();
  const selectedProductId = useWatch({ control, name: "product_id" });
  const [productAttributes, setProductAttributes] = useState({});
  const [selectedAttribute, setSelectedAttribute] = useState("");

  useEffect(() => {
    if (products && selectedProductId) {
      const product = products.data.data.find(
        (p) => p.id === parseInt(selectedProductId)
      );
      if (product) {
        const attributes = product.variants.reduce((acc, variant) => {
          const attrName = variant.attribute_value.attribute.name;
          const attrValue = variant.attribute_value;
          if (!acc[attrName]) {
            acc[attrName] = [];
          }
          acc[attrName].push(attrValue);
          return acc;
        }, {});
        setProductAttributes(attributes);
        setSelectedAttribute("");
        setValue("variant.attribute", "");
        setValue("variant.attribute_value", "");
      } else {
        setProductAttributes({});
      }
    }
  }, [selectedProductId, products, setValue]);

  const watchVariant = useWatch({
    control,
    name: "variant",
  });

  useEffect(() => {
    if (watchVariant?.attribute) {
      setSelectedAttribute(watchVariant.attribute);
    }
  }, [watchVariant?.attribute]);

  return (
    <div className="flex flex-col col-span-2 items-start gap-4 md:basis-[100%] flex-wrap">
      <div className="w-full flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
        <div className="flex-1">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1 required-field">
            Attribute Name
          </label>
          <Controller
            name="variant.attribute"
            control={control}
            defaultValue={watchVariant?.attribute || ""}
            render={({ field }) => (
              <select
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setSelectedAttribute(e.target.value);
                  setValue("variant.attribute_value", "");
                }}
              >
                <option value="">Select Attribute</option>
                {Object.keys(productAttributes).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
            Attribute Value
          </label>
          <Controller
            name="variant.attribute_value"
            control={control}
            defaultValue={watchVariant?.attribute_value || ""}
            render={({ field }) => (
              <select
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                {...field}
              >
                <option value="">Select Value</option>
                {productAttributes[selectedAttribute]?.map((attr) => (
                  <option
                    key={attr.id}
                    value={attr.id}
                    style={
                      selectedAttribute === "Color"
                        ? {
                            backgroundColor: attr.value,
                            color: attr.value,
                          }
                        : {}
                    }
                  >
                    {attr.value}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectAttribute;
