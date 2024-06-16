import { useCategories } from "@/app/_features/categories/useCategory";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { SkeletonFiler } from "@/app/components/ui/SkeletonFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const FilterByCategory = () => {
  const { data, isLoading, isError, error } = useCategories();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState([]);

  // Set initial state from URL query parameters
  useEffect(() => {
    const categoryQuery = searchParams.get("category");
    if (categoryQuery) {
      setSelectedCategories(categoryQuery.split(",").map(Number));
    }
  }, [searchParams]);

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
    <Accordion type="single" collapsible defaultValue="category">
      <AccordionItem value="category">
        <AccordionTrigger className="font-bold mb-2 font-serif px-3 mt-6">
          By Category
        </AccordionTrigger>
        <AccordionContent>
          <div className="border-b border-grey-0 px-3 pb-3">
            {isLoading && !isError ? (
              <SkeletonFiler />
            ) : (
              data?.data?.map((category) => (
                <div
                  key={category.id}
                  className="flex gap-1 items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={category.name}
                    name={category.name}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCheckboxChange(category.id)}
                    className="cursor-pointer"
                  />
                  <label className="cursor-pointer" htmlFor={category.name}>
                    {category.name}
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

export default FilterByCategory;
