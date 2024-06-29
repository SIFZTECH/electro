"use client";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import ProductsPage from "@/app/_root_ui/ProductsPage";
import CompareProducts from "./_root_ui/CompareProducts";
import { useProductsForPublic } from "./_features/products/useProducts";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const RootPage = () => {
  const [value, setValue] = useState("e-bikes");

  const params = useSearchParams();

  const page = params.get("page") || 1;
  const categoryId = params.get("category");
  const brandId = params.get("brand");
  const query = params.get("query");

  const { products, isLoading, isError, error } = useProductsForPublic(
    categoryId,
    brandId,
    page,
    query
  );

  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (product) => {
    setCompareList((prevList) => {
      if (prevList.find((p) => p.id === product.id)) {
        return prevList.filter((p) => p.id !== product.id);
      } else {
        return [...prevList, product];
      }
    });
  };

  return (
    <div className="relative w-full min-h-dvh">
      <div className="py-4 px-6 flex gap-6 items-start">
        <Image
          className="pt-5"
          src={"/logo.svg"}
          height={40}
          width={40}
          alt="Logo"
        />
        <div className="flex-1">
          <Tabs value={value} className="font-serif">
            <TabsList>
              <TabsTrigger
                value="e-bikes"
                className=""
                onClick={() => setValue("e-bikes")}
              >
                E Bikes
              </TabsTrigger>
              <TabsTrigger
                value="compare-bikes"
                onClick={() => setValue("compare-bikes")}
              >
                Compare Bikes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="e-bikes">
              <ProductsPage
                products={products}
                isLoading={isLoading}
                isError={isError}
                error={error}
                h
                page={page}
                compareList={compareList}
                toggleCompare={toggleCompare}
              />
            </TabsContent>
            <TabsContent value="compare-bikes">
              <CompareProducts compareList={compareList} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="absolute right-10">
        <div className="relative" onClick={() => setValue("compare-bikes")}>
          <Image
            className="cursor-pointer"
            src="/container.png"
            width={40}
            height={40}
            alt="container"
          />
          <p className="absolute right-0 top-0 bg-red-500 rounded-full text-white w-[1.40rem] h-[1.40rem] flex items-center justify-center">
            <span className="p-1 text-[10px] leading-3">
              {compareList.length}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RootPage;
