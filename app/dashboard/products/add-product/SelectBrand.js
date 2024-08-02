import { useBrands } from "@/app/_features/brands/useBrands";
import { BrandOptions } from "./BrandOptions";

const SelectBrand = ({ id, setValue }) => {
  const { data: brands, isLoading, isError } = useBrands();

  return (
    <div className="flex items-center gap-8">
      <div className="flex-1">
        <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
          Brand Name
        </label>
        <BrandOptions id={id} setValue={setValue} />
      </div>
    </div>
  );
};

export default SelectBrand;
