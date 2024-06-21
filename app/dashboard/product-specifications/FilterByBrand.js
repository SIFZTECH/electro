import { useBrands } from "@/app/_features/brands/useBrands";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { SkeletonFiler } from "@/app/components/ui/SkeletonFilter";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const FilterByBrand = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, isLoading, isError } = useBrands();
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Set initial state from URL query parameters
  useEffect(() => {
    const brandQuery = searchParams.get("brand");
    if (brandQuery) {
      setSelectedBrands(brandQuery.split(",").map(Number));
    }
  }, [searchParams]);

  const handleCheckboxChange = (brandId) => {
    const updatedSelectedBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter((id) => id !== brandId)
      : [...selectedBrands, brandId];

    setSelectedBrands(updatedSelectedBrands);

    const query = updatedSelectedBrands.length
      ? `?brand=${updatedSelectedBrands.join(",")}`
      : "";
    router.push(`/dashboard/product-specifications${query}`);
  };

  return (
    <Accordion type="single" collapsible defaultValue="brand">
      <AccordionItem value="brand">
        <AccordionTrigger className="font-bold mb-2 font-serif px-3 mt-6">
          By Brand
        </AccordionTrigger>
        <AccordionContent>
          <div className="border-b border-grey-0 px-3 pb-3">
            {isLoading && !isError ? (
              <SkeletonFiler />
            ) : (
              data?.data?.map((brand) => (
                <div
                  key={brand.id}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={brand.name}
                    name={brand.name}
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => handleCheckboxChange(brand.id)}
                    className="cursor-pointer"
                  />
                  <label className="cursor-pointer" htmlFor={brand.name}>
                    {brand.name}
                  </label>
                </div>
              ))
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterByBrand;
