import { useMedia } from "@/app/_features/social_media/useMedia";
import { Controller, useFieldArray } from "react-hook-form";

const SpecificationForm = ({ control }) => {
  const { data, isError, isLoading, error } = useMedia(true);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications",
  });

  const icons = data ? data.data : [];

  return (
    <div className="flex flex-col col-span-2 items-start gap-4 md:basis-[100%] flex-wrap">
      <h1 className="block font-semibold font-serif text-gray-900 my-3">
        Specifications
      </h1>
      {fields.map((item, index) => (
        <div className="w-full" key={index + 1}>
          <div className="flex gap-8 items-center w-full">
            <div className="flex-1">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                Key {index + 1}
              </label>
              <Controller
                render={({ field }) => (
                  <input
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:text-gray-500"
                    placeholder="Specification key"
                    {...field}
                  />
                )}
                name={`specifications[${index}].key`}
                control={control}
                defaultValue={item.key} // Make sure to set up defaultValue
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                Name
              </label>
              <Controller
                render={({ field }) => (
                  <input
                    placeholder="Specification name"
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:text-gray-500"
                    {...field}
                  />
                )}
                name={`specifications[${index}].name`}
                control={control}
                defaultValue={item.name} // Make sure to set up defaultValue
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                Icon Path
              </label>
              <Controller
                render={({ field }) => (
                  <select
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:text-gray-500"
                    {...field}
                  >
                    <option value="">Please choose an icon</option>
                    {icons.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                )}
                name={`specifications[${index}].icon_path_value`}
                control={control}
                defaultValue={item.icon_path_value} // Make sure to set up defaultValue
              />
            </div>
            <button
              type="button"
              className="btn-primary texl-sm bg-gray-200 py-[9px] self-end"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        className="btn-primary font-serif text-sm"
        type="button"
        onClick={() => append({ key: "", value: "", icon_path_value: "" })}
      >
        Add More
      </button>
    </div>
  );
};

export default SpecificationForm;
