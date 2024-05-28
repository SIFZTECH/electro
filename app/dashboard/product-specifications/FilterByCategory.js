import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

async function getCategory() {
  const req = await fetch("https://electro-api.sifztech.com/api/categories", {
    headers: {
      Authorization: `Bearer 13|lYMGOtqeLhRz9M3fpu0wndP2WgRxYeVLJzSGOK3Pf6bdbd13`,
    },
  });
  const res = await req.json();
  console.log(res);
}

const FilterByCategory = async () => {
  const categories = await getCategory();

  return (
    <Accordion type="single" collapsible defaultValue="category">
      <AccordionItem value="category">
        <AccordionTrigger className="font-bold mb-2 font-serif px-3 mt-6">
          By Category
        </AccordionTrigger>
        <AccordionContent>
          <div className="border-b border-grey-0 px-3 pb-3">
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
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterByCategory;
