import FilterByBrand from "./FilterByBrand";
import FilterByCategory from "./FilterByCategory";
import FilterByCondition from "./FilterByCondition";
import FilterBySize from "./FilterBySize";

const FilterByProduct = () => {
  return (
    <div className="border border-gray-0 ">
      <div className="border-b flex justify-between gap-2 py-6 px-3 font-serif">
        <h2 className="font-semibold">Filters</h2>
        <button className="text-yellow-400">Clear All</button>
      </div>

      <FilterByCategory />
      {/* <FilterBySize /> */}
      <FilterByBrand />
      {/* <FilterByCondition /> */}
    </div>
  );
};

export default FilterByProduct;
