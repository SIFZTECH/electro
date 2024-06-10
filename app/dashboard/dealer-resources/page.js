"use client";

import { useDealerResourcesForAdmin } from "@/app/_features/dealer-resources/useResources";
import FilterBy from "@/app/components/ui/FilterBy";
import Spinner from "@/app/components/ui/Spinner";
import AllResources from "./AllResources";
import Link from "next/link";
import CreateNewResources from "./CreateNewResources";
import { useRoles } from "@/app/_features/roles/useRoles";

const ResourcesPage = () => {
  const { isLoading: isLoading2, permissions } = useRoles();

  const { data, isLoading, isError, error } = useDealerResourcesForAdmin();

  if (isLoading) return <Spinner />;

  return (
    <div className="dealer-resources">
      <div className="flex justify-between items-center mb-10">
        <h1 className="heading-h1">Dealer Resources</h1>
        <CreateNewResources />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] 2xl:grid-cols-[.20fr_1fr] gap-6">
        {!isLoading && !isError && !error && (
          <>
            <FilterBy />
            <AllResources data={data.data} />
          </>
        )}
        {!isLoading && isError && error && (
          <h1>
            {error?.response.data.message
              ? error.response.data.message
              : error.message}
          </h1>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
