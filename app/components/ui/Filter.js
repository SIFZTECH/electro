import { useCategories } from "@/app/_features/categories/useCategory";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { SkeletonFiler } from "@/app/components/ui/SkeletonFilter";

const Filter = ({
  title,
  isLoading,
  isError,
  data,
  selectedItems,
  handleCheckboxChange,
}) => {
  return (
    <Accordion type="single" collapsible defaultValue="category">
      <AccordionItem value="category">
        <AccordionTrigger className="font-bold mb-2 font-serif px-3 mt-6">
          By {title}
        </AccordionTrigger>
        <AccordionContent>
          <div className="border-b border-grey-0 px-3 pb-3">
            {isLoading && !isError ? (
              <SkeletonFiler />
            ) : (
              data.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={item.name}
                    name={item.name}
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="cursor-pointer"
                  />
                  <label className="cursor-pointer" htmlFor={item.name}>
                    {item.name}
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

export default Filter;
