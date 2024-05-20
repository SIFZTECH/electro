import FilterByBrand from "./FilterByBrand";
import FilterByModal from "./FilterByModal";

const FilterBy = () => {
  return (
    <div className="border border-gray-0 ">
      <div className="border-b flex justify-between gap-2 py-6 px-3 font-serif">
        <h2 className="font-semibold">Filters</h2>
        <button className="text-yellow-400">Clear All</button>
      </div>
      <FilterByModal />
      <FilterByBrand />
    </div>
  );
};

export default FilterBy;
