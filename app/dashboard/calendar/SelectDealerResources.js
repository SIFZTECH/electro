import { useDealerResourcesForAll } from "@/app/_features/dealer-resources/useResources";
import MultipleSelector from "@/app/components/ui/multi-selector";
import React from "react";
import { Controller } from "react-hook-form";

const SelectDealerResources = ({ control }) => {
  const { data, isLoading, isError } = useDealerResourcesForAll();

  const userOptions =
    !isLoading &&
    !isError &&
    data?.data.map((folder) => {
      return {
        label: folder.folder_name,
        value: folder.id,
        image: "/icons8-folder.svg",
      };
    });

  if (isLoading) return;

  return (
    <Controller
      name="resources_folders"
      control={control}
      render={({ field }) => (
        <MultipleSelector
          {...field}
          defaultOptions={userOptions}
          placeholder="Select folders..."
          emptyIndicator={<p className="text-center">no results found.</p>}
        />
      )}
    />
  );
};

export default SelectDealerResources;
