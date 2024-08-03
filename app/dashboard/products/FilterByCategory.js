import { useCategoriesForPublic } from "@/app/_features/categories/useCategory";

import Filter from "@/app/components/ui/Filter";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const FilterByCategory = ({ selectedCategories, setSelectedCategories }) => {
  const { data, isLoading, isError, error } = useCategoriesForPublic();
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
    router.push(`/dashboard/products${query}`);
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
