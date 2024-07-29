"use client";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import ProductsPage from "@/app/components/_root_ui/ProductsPage";
import CompareProducts from "./components/_root_ui/CompareProducts";
import { useProductsForPublic } from "./_features/products/useProducts";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "./_features/authentication/useUser";

const RootPage = () => {
  const { user, isLoading: isLoading2, isVerified } = useUser();
  const [value, setValue] = useState("e-bikes");
  const [misc13, setMisc13] = useState("");
  const [sort, setSort] = useState("");

  const params = useSearchParams();

  const page = params.get("page") || 1;
  const categoryId = params.get("category");
  const brandId = params.get("brand");
  const query = params.get("query");

  const { products, isLoading, isError, error } = useProductsForPublic(
    categoryId,
    brandId,
    page,
    query,
    sort,
    misc13
  );

  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialCompareList =
        JSON.parse(localStorage.getItem("compareList")) || [];
      setCompareList(initialCompareList);
    }
  }, []);

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
              {compareList?.length}
            </span>
          </p>
        </div>
      </div>
      <div className="py-4 px-6 flex flex-col items-start">
        <div className="w-full flex sm:flex-row flex-col gap-y-6 justify-between items-center">
          <Image
            className="pt-5"
            src={"/logo.jpeg"}
            height={100}
            width={100}
            alt="Logo"
          />
          <div className="flex items-center gap-3">
            <Link
              className="btn-primary bg-transparent text-color-primary border border-color-primary"
              href="/register-warranty"
            >
              Register Warranty
            </Link>
            {!isLoading2 && user ? (
              <Link className="btn-primary" href="/dashboard">
                Dashboard
              </Link>
            ) : (
              <Link className="btn-primary" href="/login">
                Log in
              </Link>
            )}
          </div>
        </div>
        <div className="flex-1 w-full">
          <Tabs value={value} className="font-serif w-full">
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
                page={page}
                compareList={compareList}
                toggleCompare={toggleCompare}
                setValue={setValue}
                sort={sort}
                setSort={setSort}
                misc13={misc13}
                setMisc13={setMisc13}
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
