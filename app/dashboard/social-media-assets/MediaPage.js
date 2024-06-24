"use client";

import FilterBy from "@/app/components/ui/FilterBy";
import Spinner from "@/app/components/ui/Spinner";
import AllSocialMediaAssets from "./AllSocialMediaAssets";
import CreateNewAssets from "./CreateNewAssets";
import useCheckPermission from "@/app/_hooks/usePermission";
import NoPermission from "@/app/components/ui/NoPermission";
import NotFoundData from "@/app/components/ui/NotFoundData";
import { useSearchParams } from "next/navigation";
import { useSocialMediaResources } from "@/app/_features/social_media/useMediaAssets";

const MediaPage = () => {
  const params = useSearchParams();
  const page = params.get("page") ? +params.get("page") : 1;
  const query = params.get("query");
  const { data, isLoading, isError, error } = useSocialMediaResources(
    page,
    query
  );

  // const isDealerAddPermission = useCheckPermission("dealer_add");
  const isMediaPermission = useCheckPermission("social_media_assets");

  if (!isMediaPermission) {
    return (
      <NoPermission message="You don't have permission to access this route" />
    );
  }

  if (isLoading) return <Spinner />;
  const folders = data?.data ? data.data : data;

  return (
    <div className="dealer-resources">
      <div className="flex justify-between items-center mb-10">
        <h1 className="heading-h1">Social Media Assets</h1>
        {/* {isDealerAddPermission && <CreateNewAssets />} */}
        <CreateNewAssets />
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
            <AllSocialMediaAssets data={folders} metaData={data} page={page} />
          </>
        )}
      </div>
    </div>
  );
};

export default MediaPage;
