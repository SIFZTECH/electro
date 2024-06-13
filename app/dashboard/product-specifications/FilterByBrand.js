import { useBrands } from "@/app/_features/brands/useBrands";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { SkeletonFiler } from "@/app/components/ui/SkeletonFilter";

const FilterByBrand = () => {
  const { data, isLoading, isError, error } = useBrands();

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
                  className="flex gap-1 items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={brand.name}
                    name={brand.name}
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
