import { useMediasForAll } from "@/app/_features/social_media/useMediaAssets";
import MultipleSelector from "@/app/components/ui/multi-selector";
import React from "react";
import { Controller } from "react-hook-form";

const SelectSocialMediaAssets = ({ control }) => {
  const { data, isLoading, isError } = useMediasForAll();

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
      name="social_media_folders"
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

export default SelectSocialMediaAssets;
