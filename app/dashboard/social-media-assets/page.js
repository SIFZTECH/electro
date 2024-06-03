"use client";

import { useMedia } from "@/app/_features/social_media/useMedia";
import FilterBy from "@/app/components/ui/FilterBy";
import Spinner from "@/app/components/ui/Spinner";
import AllMedia from "./AllMedia";

const MediaPage = () => {
  const { data, isLoading, isError, error } = useMedia();

  if (isLoading) return <Spinner />;

  return (
    <div className="dealer-resources">
      <h1 className="heading-h1 mb-10">Dealer Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] 2xl:grid-cols-[.20fr_1fr] gap-6 2xl:w-[95%]">
        {!isLoading && !isError && !error && (
          <>
            <FilterBy />
            <AllMedia data={data.data} />
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

export default MediaPage;
