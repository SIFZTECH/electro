"use client";

import { useDealerResources } from "@/app/_features/dealer-resources/useResources";
import FilterBy from "@/app/components/ui/FilterBy";
import Spinner from "@/app/components/ui/Spinner";
import AllResources from "./AllResources";
import CreateNewResources from "./CreateNewResources";
import useCheckPermission from "@/app/_hooks/usePermission";
import NoPermission from "@/app/components/ui/NoPermission";
import NotFoundData from "@/app/components/ui/NotFoundData";
import { useSearchParams } from "next/navigation";

const ResourcesPage = () => {
  const params = useSearchParams();
  const page = params.get("page") ? +params.get("page") : 1;
  const { data, isLoading, isError, error } = useDealerResources(page);

  // const isDealerAddPermission = useCheckPermission("dealer_add");
  const isDealerListPermission = useCheckPermission("dealer_list");

  if (!isDealerListPermission) {
    return (
      <NoPermission message="You don't have permission to access this route" />
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="dealer-resources">
      <div className="flex justify-between items-center mb-10">
        <h1 className="heading-h1">Dealer Resources</h1>
        {/* {isDealerAddPermission && <CreateNewResources />} */}
        <CreateNewResources />
      </div>
      {!isLoading && isError && error && (
        <NotFoundData
          message={
            error?.response?.data?.message
              ? error.response.data.message
              : error.message
          }
        />
      )}
      {/* <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] 2xl:grid-cols-[.20fr_1fr] gap-6"> */}
      <div className="flex flex-wrap w-full">
        {!isLoading && !isError && !error && (
          <>
            {/* <FilterBy /> */}
            <AllResources data={data.data} metaData={data} page={page} />
          </>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
