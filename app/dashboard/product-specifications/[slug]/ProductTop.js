"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import ProductImage from "./ProductImage";

const ProductTop = () => {
  return (
    <div className="flex gap-8 flex-col lg:flex-row">
      <ProductImage />
      <div className="product__summary flex flex-col gap-8">
        <div className="product__name flex items-center gap-3">
          <span className="font-serif font-semibold text-xl">NCMs 3</span>
          <span className="badge bg-color-primary rounded-full px-2 text-[12px]">
            Best Seller
          </span>
        </div>
        <div className="product__colors">
          <h3 className="font-serif mb-1">Colors</h3>
          <Tabs>
            <TabsList>
              <div className="flex items-center font-serif w-fit gap-2">
                <TabsTrigger
                  className="w-6 h-6 rounded-full data-[state='active']:ring-2 data-[state='active']:ring-offset-1 data-[state='active']:ring-color-primary bg-gray-600"
                  defaultValue="gray"
                >
                  &nbsp;
                </TabsTrigger>
                <TabsTrigger
                  className="w-6 h-6 rounded-full data-[state='active']:ring-2 data-[state='active']:ring-offset-1 data-[state='active']:ring-color-primary  bg-red-600"
                  value="red"
                >
                  &nbsp;
                </TabsTrigger>
                <TabsTrigger
                  className="w-6 h-6 rounded-full data-[state='active']:ring-2 data-[state='active']:ring-offset-1 data-[state='active']:ring-color-primary  bg-yellow-600"
                  value="yellow"
                >
                  &nbsp;
                </TabsTrigger>
              </div>
              <TabsContent className="hidden" value="gray"></TabsContent>
              <TabsContent className="hidden" value="red"></TabsContent>
              <TabsContent className="hidden" value="yellow"></TabsContent>
            </TabsList>
          </Tabs>
        </div>
        <div className="product__sizes">
          <h3 className="font-serif mb-1">Sizes</h3>
          <Tabs>
            <TabsList>
              <div className="flex items-center font-serif border border-color-primary w-fit">
                <TabsTrigger
                  className="px-3 cursor-pointer py-1 data-[state='active']:bg-color-primary font-serif"
                  defaultValue="42"
                >
                  42
                </TabsTrigger>
                <TabsTrigger
                  className="px-3 cursor-pointer py-1 data-[state='active']:bg-color-primary font-serif"
                  value="36"
                >
                  35
                </TabsTrigger>
              </div>
              <TabsContent className="hidden" value="42"></TabsContent>
              <TabsContent className="hidden" value="36"></TabsContent>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductTop;
