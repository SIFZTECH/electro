"use client";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import ProductsPage from "./ProductsPage";
import CompareProducts from "@/app/components/_root_ui/CompareProducts";
import { useProducts } from "@/app/_features/products/useProducts";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCategories from "./ProductCategories";
import useCheckPermission from "@/app/_hooks/usePermission";

const RootPage = () => {
  const [value, setValue] = useState("e-bikes");

  const params = useSearchParams();

  const page = params.get("page") || 1;
  const categoryId = params.get("category");
  const brandId = params.get("brand");
  const query = params.get("query");
  const isPermission = useCheckPermission("product_add");

  const { products, isLoading, isError, error } = useProducts(
    categoryId,
    brandId,
    page,
    query
  );

  const initialCompareList =
    JSON.parse(localStorage.getItem("compareList")) || [];
  const [compareList, setCompareList] = useState(initialCompareList);

  const toggleCompare = (product) => {
    setCompareList((prevList) => {
      if (prevList.find((p) => p.id === product.id)) {
        return prevList.filter((p) => p.id !== product.id);
      } else if (prevList.length < 5) {
        return [...prevList, product];
      } else {
        alert("You can only compare up to 5 products.");
        return prevList;
      }
    });
  };

  // Update local storage whenever compareList changes
  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  return (
    <div className="relative w-full min-h-dvh overflow-hidden">
      <div className="fixed right-5 bottom-8 z-[9999] bg-white">
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
      <div className="flex gap-6 items-start">
        <div className="flex-1">
          <Tabs value={value} className="font-serif">
            <div className="flex justify-between items-center">
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
              {isPermission && <ProductCategories />}
            </div>
            <TabsContent value="e-bikes">
              <ProductsPage
                products={products}
                isLoading={isLoading}
                isError={isError}
                error={error}
                page={page}
                compareList={compareList}
                toggleCompare={toggleCompare}
                setValue={setValue}
              />
            </TabsContent>
            <TabsContent value="compare-bikes">
              <CompareProducts
                compareList={compareList}
                toggleCompare={toggleCompare}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default RootPage;
