import { Controller, useFieldArray } from "react-hook-form";

const SpecificationForm = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications",
  });

  return (
    <div className="flex flex-col col-span-2 items-start gap-4 md:basis-[100%] flex-wrap">
      {fields.map((item, index) => (
        <>
          <h1 className="block font-semibold font-serif text-gray-900 mt-6 mb-0">
            Specifications
          </h1>
          <div className="flex gap-8 items-center w-full" key={index + 1}>
            <div className="flex-1">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                Key {index + 1}
              </label>
              <Controller
                render={({ field }) => (
                  <input
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:text-gray-500"
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
                  <input
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:text-gray-500"
                    {...field}
                  />
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
        </>
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
