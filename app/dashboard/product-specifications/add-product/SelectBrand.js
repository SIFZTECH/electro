import { useBrands } from "@/app/_features/brands/useBrands";

const SelectBrand = ({ register, errors }) => {
  const { data: brands, isLoading, isError } = useBrands();

  return (
    <div className="flex items-center gap-8">
      <div className="flex-1">
        <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
          Brand Name
        </label>
        <div className="mt-1">
          <select
            className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            {...register("brand_id", {
              required: "This is required field!",
            })}
          >
            <option value="">--Please choose an option--</option>
            {!isLoading &&
              brands.data.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
          </select>
          {errors?.brand_id && (
            <span className="text-red-500 text-sm">
              {errors.brand_id.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectBrand;
