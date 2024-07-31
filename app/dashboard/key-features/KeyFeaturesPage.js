"use client";

import FeatureTable from "./FeatureTable";
import Spinner from "@/app/components/ui/Spinner";
import CreateNewFeature from "./CreateNewFeature";

import PaginationUI from "@/app/components/ui/PaginationUI";
import { useSearchParams } from "next/navigation";
import { CATAGORY_PAGE_SIZE } from "@/app/lib/utils";
import { useFeatures } from "@/app/_features/key_features/useFeatures";

const BrandPage = () => {
  const params = useSearchParams();
  const page = params.get("page") ? +params.get("page") : 1;
  const { data, isLoading, isError, error } = useFeatures(page);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="heading-h1 mb-5">All Key Features</h1>
        <CreateNewFeature />
      </div>

      {!isLoading && !isError && !error && data && <FeatureTable data={data} />}
      {!isLoading && isError && error && (
        <h1>
          {error?.response.data.message
            ? error.response.data.message
            : error.message}
        </h1>
      )}
      <PaginationUI
        data={data}
        page={page}
        page_size={CATAGORY_PAGE_SIZE}
        navigation="brands"
      />
    </div>
  );
};

export default BrandPage;
