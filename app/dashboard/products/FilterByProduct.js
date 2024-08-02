import Link from "next/link";
import FilterByBrand from "./FilterByBrand";
import FilterByCategory from "./FilterByCategory";
import FilterByCondition from "./FilterByCondition";
import FilterBySize from "./FilterBySize";
import { useState } from "react";
import SearchProduct from "./SearchProduct";

const FilterByProduct = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  return (
    <>
      <div className="md:hidden">
        <SearchProduct />
      </div>

      <div className="border border-gray-0">
        <div className="border-b flex justify-between gap-2 py-6 px-3 font-serif">
          <h2 className="font-semibold">Filters</h2>
          <Link
            href="/dashboard/product-specifications"
            className="text-color-primary"
            onClick={resetFilters}
          >
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
    </>
  );
};

export default FilterByProduct;
