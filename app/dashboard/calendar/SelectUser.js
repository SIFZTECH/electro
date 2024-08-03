import { useAllUsers } from "@/app/_features/users/useUsers";
import MultipleSelector from "@/app/components/ui/multi-selector";
import Spinner from "@/app/components/ui/Spinner";
import { BASE_URL, BASE_URL_IMAGE } from "@/app/lib/utils";
import React from "react";
import { Controller } from "react-hook-form";

const SelectUser = ({ control, existingUser }) => {
  const { data, isLoading, isError } = useAllUsers();

  const userOptions =
    !isLoading &&
    !isError &&
    data?.data
      ?.filter((user) => user.roles[0]?.id !== 3)
      .map((user) => {
        return {
          label: `${user?.firstname} ${user?.lastname} - ${user?.email} - ${user?.roles[0]?.name}`,
          value: user.id,
          image: user?.profile
            ? `${BASE_URL_IMAGE}${user.profile}`
            : "/default.jpg",
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

export default SelectUser;
