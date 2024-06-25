import { useCategories } from "@/app/_features/categories/useCategory";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import Filter from "@/app/components/ui/Filter";
import { SkeletonFiler } from "@/app/components/ui/SkeletonFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const FilterByCategory = ({ selectedCategories, setSelectedCategories }) => {
  const { data, isLoading, isError, error } = useCategories();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Set initial state from URL query parameters
  useEffect(() => {
    const categoryQuery = searchParams.get("category");
    if (categoryQuery) {
      setSelectedCategories(categoryQuery.split(",").map(Number));
    }
  }, [searchParams, setSelectedCategories]);

  const handleCheckboxChange = (categoryId) => {
    const updatedSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedSelectedCategories);

    const query = updatedSelectedCategories.length
      ? `?category=${updatedSelectedCategories.join(",")}`
      : "";
    router.push(`/dashboard/product-specifications${query}`);
  };

  return (
    <Filter
      title="Category"
      isLoading={isLoading}
      isError={isError}
      data={data?.data}
      selectedItems={selectedCategories}
      handleCheckboxChange={handleCheckboxChange}
    />
  );
};

export default FilterByCategory;
