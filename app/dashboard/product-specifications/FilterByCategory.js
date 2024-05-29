import { useCategories } from "@/app/_features/categories/useCategory";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { SkeletonFiler } from "@/app/components/ui/SkeletonFilter";

const FilterByCategory = () => {
  const { categories, isLoading, isError } = useCategories();

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
              categories.data.map((category) => (
                <div
                  key={category.id}
                  className="flex gap-1 items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={category.name}
                    name={category.name}
                  />
                  <label htmlFor={category.name}>{category.name}</label>
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
