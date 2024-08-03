import { useDealerResources } from "@/app/_features/dealer-resources/useResources";
import MultipleSelector from "@/app/components/ui/multi-selector";
import React from "react";
import { Controller } from "react-hook-form";

const SelectSocialMediaAssests = ({ control }) => {
  const { data, isLoading, isError } = useDealerResources();

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
      name="visible_to"
      control={control}
      render={({ field }) => (
        <MultipleSelector
          {...field}
          defaultOptions={userOptions}
          placeholder="Select user..."
          emptyIndicator={<p className="text-center">no results found.</p>}
        />
      )}
    />
  );
};

export default SelectSocialMediaAssests;
