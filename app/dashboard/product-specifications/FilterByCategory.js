import { useCategories } from "@/app/_features/categories/useCategory";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Skeleton } from "@/app/components/ui/skeleton";
import { SkeletonFiler } from "@/app/components/ui/SkeletonFilter";

const FilterByCategory = () => {
  const { categories, isLoading, error } = useCategories();

  if (isLoading) return <Skeleton />;

  return (
    <Accordion type="single" collapsible defaultValue="category">
      <AccordionItem value="category">
        <AccordionTrigger className="font-bold mb-2 font-serif px-3 mt-6">
          By Category
        </AccordionTrigger>
        <AccordionContent>
          {/* <div className="border-b border-grey-0 px-3 pb-3">
            <div className="flex gap-1 items-center">
              <input type="checkbox" id="ct-1" name="ct-1" defaultChecked />
              <label htmlFor="ct-1">E Mountain</label>
            </div>
            <div className="flex gap-1 items-center">
              <input type="checkbox" id="ct-2" name="ct-2" />
              <label htmlFor="ct-2">E Tekking</label>
            </div>
            <div className="flex gap-1 items-center">
              <input type="checkbox" id="ct-3" name="ct-3" />
              <label htmlFor="ct-3">E Mountain</label>
            </div>
            <div className="flex gap-1 items-center">
              <input type="checkbox" id="ct-4" name="ct-4" />
              <label htmlFor="ct-4">E Mountain</label>
            </div>
          </div> */}
          <SkeletonFiler />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterByCategory;
