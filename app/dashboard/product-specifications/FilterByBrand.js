import { useBrands } from "@/app/_features/brands/useBrands";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import Filter from "@/app/components/ui/Filter";
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
    <Filter
      isLoading={isLoading}
      isError={isError}
      data={data?.data}
      selectedItems={selectedBrands}
      handleCheckboxChange={handleCheckboxChange}
    />
  );
};

export default FilterByBrand;
