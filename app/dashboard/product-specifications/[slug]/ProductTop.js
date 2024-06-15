"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import ProductImage from "./ProductImage";

const ProductTop = ({ product }) => {
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

  console.log("Color", colorValues);

  return (
    <div className="flex gap-8 flex-col lg:flex-row">
      <ProductImage />
      <div className="product__summary flex flex-col gap-8">
        <div className="product__name flex items-center gap-3">
          <span className="font-serif font-semibold text-xl">
            {product.name}
          </span>
          <span className="badge bg-color-primary rounded-full px-2 text-[12px]">
            Best Seller
          </span>
        </div>
        {colorValues.length > 0 && (
          <div className="product__colors">
            <h3 className="font-serif mb-1">Colors</h3>
            <Tabs defaultValue={colorValues[0]}>
              <TabsList>
                <div className="flex items-center font-serif w-fit gap-2">
                  {colorValues.map((color, i) => (
                    <TabsTrigger
                      key={i + 1}
                      style={{ backgroundColor: color }}
                      className="w-6 h-6 rounded-full data-[state='active']:ring-2 data-[state='active']:ring-offset-1 data-[state='active']:ring-color-primary"
                      value={color}
                    >
                      &nbsp;
                    </TabsTrigger>
                  ))}
                </div>
                {colorValues.map((color, i) => (
                  <TabsContent
                    key={i + 1}
                    className="hidden"
                    value={color}
                  ></TabsContent>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}
        {sizeValues.length > 0 && (
          <div className="product__sizes">
            <h3 className="font-serif mb-1">Sizes</h3>
            <Tabs defaultValue={sizeValues[0]}>
              <TabsList>
                <div className="flex items-center font-serif border border-color-primary w-fit">
                  {sizeValues.map((size, i) => (
                    <TabsTrigger
                      key={i + 1}
                      value={size}
                      className="px-3 cursor-pointer py-1 data-[state='active']:bg-color-primary font-serif"
                    >
                      {size}
                    </TabsTrigger>
                  ))}
                </div>
                {sizeValues.map((size, i) => (
                  <TabsContent
                    value={size}
                    key={i + 1}
                    className="hidden"
                  ></TabsContent>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}
        {/* attribute_value : attribute : id : 9 name : "Test" [[Prototype]] :
        Object attribute_id : 9 id : 21 value : "Normal" */}
        <div className="flex flex-col items-start gap-2">
          {filteredVariants.map((variant) => {
            console.log(variant);
            return (
              <div key={variant.id} className="flex flex-col">
                <span className="font-serif mb-1">
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
