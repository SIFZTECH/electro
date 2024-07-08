import { useAllUsers } from "@/app/_features/users/useUsers";
import MultipleSelector from "@/app/components/ui/multi-selector";
import Spinner from "@/app/components/ui/Spinner";
import React from "react";
import { Controller } from "react-hook-form";

const SelectUser = ({ control, existingUser }) => {
  const { data, isLoading, isError } = useAllUsers();

  const userOptions =
    !isLoading &&
    !isError &&
    data?.data?.map((user) => {
      return {
        label: `${user.firstname} ${user.lastname} - ${user.email} - ${user.roles[0].name}`,
        value: user.id,
      };
    });

  if (isLoading) return;
  return (
    <div className="flex w-full flex-col">
      <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
        Access Users
      </label>
      <Controller
        name="access_users"
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
    </div>
  );
};

export default SelectUser;
