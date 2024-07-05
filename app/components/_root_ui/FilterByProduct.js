import Link from "next/link";
import FilterByBrand from "./FilterByBrand";
import FilterByCategory from "./FilterByCategory";
import { useState } from "react";

const FilterByProduct = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  return (
    <div className="border border-gray-0 ">
      <div className="border-b flex justify-between gap-2 py-6 px-3 font-serif">
        <h2 className="font-semibold">Filters</h2>
        <Link href="/" className="text-[#FFB500]" onClick={resetFilters}>
          Clear All
        </Link>
      </div>

      <FilterByCategory
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      {/* <FilterBySize /> */}
      <FilterByBrand
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
      />
      {/* <FilterByCondition /> */}
    </div>
  );
};

export default FilterByProduct;
