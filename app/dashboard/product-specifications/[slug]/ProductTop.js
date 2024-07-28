"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group";
import ProductImage from "./ProductImage";

const ProductTop = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(product.price);

  useEffect(() => {
    const variant = product.variants.find(
      (variant) =>
        (variant.attribute_value.attribute.name === "Color" &&
          variant.attribute_value.value === selectedColor) ||
        (variant.attribute_value.attribute.name === "Size" &&
          variant.attribute_value.value === selectedSize)
    );

    if (variant) {
      setSelectedPrice(parseFloat(product.price) + parseFloat(variant.price));
    } else {
      setSelectedPrice(product.price);
    }
  }, [selectedColor, selectedSize, product]);

  // Function to get the values based on attribute name
  function getValuesByAttributeName(variants, attributeName) {
    return variants
      .filter(
        (variant) => variant.attribute_value.attribute.name === attributeName
      )
      .map((variant) => variant.attribute_value.value);
  }

  const filteredVariants = product.variants.filter((variant) => {
    const attributeName = variant.attribute_value.attribute.name;
    return attributeName !== "Color" && attributeName !== "Size";
  });

  // Get the values for the attribute name "Color"
  const colorValues = getValuesByAttributeName(product.variants, "Color");
  const sizeValues = getValuesByAttributeName(product.variants, "Size");

  return (
    <div className="flex gap-8 flex-col lg:flex-row">
      <ProductImage images={product?.images} product_name={product?.name} />
      <div className="product__summary flex flex-col gap-8">
        {product?.status === "Active" && (
          <p className="bg-green-500 text-white text-sm font-medium rounded-full px-2 py-1 self-start">
            {product.status}
          </p>
        )}
        {product?.status === "Inactive" && (
          <p className="bg-gray-400 text-gray-800 text-sm font-medium rounded-full px-2 py-1 self-start">
            {product.status}
          </p>
        )}
        {product?.status === "Pending" && (
          <p className="bg-yellow-400 text-yellow-800 text-sm font-medium rounded-full px-2 py-1 self-start">
            {product.status}
          </p>
        )}
        {product?.status === "Out of Stock" && (
          <p className="bg-red-500 text-white text-sm font-medium rounded-full px-2 py-1 self-start">
            {product.status}
          </p>
        )}
        {product?.status === "Discontinued" && (
          <p className="bg-gray-600 text-white text-sm font-medium rounded-full px-2 py-1 self-start">
            {product.status}
          </p>
        )}
        {product?.status === "Draft" && (
          <p className="bg-blue-400 text-white text-sm font-medium rounded-full px-2 py-1 self-start">
            {product.status}
          </p>
        )}
        {product?.status === "Pre-order" && (
          <p className="bg-purple-400 text-white text-sm font-medium rounded-full px-2 py-1 self-start">
            {product.status}
          </p>
        )}
        {product?.status === "Backorder" && (
          <p className="bg-yellow-500 text-white text-sm font-medium rounded-full px-2 py-1 self-start">
            {product.status}
          </p>
        )}
        {product?.status === "On Hold" && (
          <p className="bg-orange-400 text-white text-sm font-medium rounded-full px-2 py-1 self-start">
            {product.status}
          </p>
        )}
        {product?.status === "Featured" && (
          <p className="bg-pink-400 text-white text-sm font-medium rounded-full px-2 py-1 self-start">
            {product.status}
          </p>
        )}
        {product?.status === "Custom" && (
          <p className="bg-teal-400 text-white text-sm font-medium rounded-full px-2 py-1 self-start">
            {product.status}
          </p>
        )}

        <div className="product__name flex gap-3 flex-col xl:flex-row xl:items-center ">
          <span className="font-serif font-semibold text-xl">
            {product.name}
          </span>
        </div>
        <h1 className="font-serif text-xl font-semibold">
          ${selectedPrice === "0.00" ? product.price : selectedPrice}
        </h1>
        {colorValues.length > 0 && (
          <div className="product__colors">
            <h3 className="font-serif mb-2">Colors</h3>

            <ToggleGroup
              type="single"
              onValueChange={(value) => {
                setSelectedColor(value);
              }}
            >
              {colorValues.map((color, i) => (
                <ToggleGroupItem
                  key={i + 1}
                  style={{ backgroundColor: color }}
                  className="w-6 h-6 rounded-full data-[state='on']:ring-2 data-[state='on']:ring-offset-1 data-[state='on']:ring-color-primary"
                  value={color}
                >
                  &nbsp;
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        )}
        {sizeValues.length > 0 && (
          <div className="product__sizes">
            <h3 className="font-serif mb-2">Sizes</h3>
            <ToggleGroup
              type="single"
              className="gap-1"
              onValueChange={(value) => {
                setSelectedSize(value);
              }}
            >
              {sizeValues.map((size, i) => (
                <ToggleGroupItem
                  key={i + 1}
                  className="px-3 cursor-pointer border border-color-primary py-1 hover:bg-transparent data-[state=on]:bg-color-primary data-[state=on]:text-white text-color-primary font-serif text-base"
                  value={size}
                >
                  {size}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        )}

        <span className="badge xl:bg-color-primary text-white rounded-full xl:px-2 font-serif xl:font-sans xl:text-[12px] line-clamp-1"></span>
        <div className="flex flex-col items-start gap-2">
          {filteredVariants.map((variant) => {
            return (
              <div key={variant.id} className="flex flex-col">
                <span className="font-serif font-medium mb-1">
                  {variant.attribute_value.attribute.name}
                </span>
                <button className="btn-primary">
                  {variant.attribute_value.value}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductTop;
