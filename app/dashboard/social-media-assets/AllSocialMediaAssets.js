import NotFoundData from "@/app/components/ui/NotFoundData";
import FolderFiles from "./FolderFiles";
import PaginationUI from "@/app/components/ui/PaginationUI";
import { SOCIALMEDIAASSESTS_PAGE_SIZE } from "@/app/lib/utils";
import SearchFolder from "@/app/components/ui/Search";

const AllSocialMediaAssets = ({ data, metaData, page }) => {
  return (
    <div className="flex-1">
      <SearchFolder navigateTo="/dashboard/social-media-assets" />

      {data.length === 0 ? (
        <NotFoundData message="There is no Social Media Assets available" />
      ) : (
        <FolderFiles data={data} />
      )}
      <div className="mt-6">
        <PaginationUI
          data={metaData}
          page={page}
          page_size={SOCIALMEDIAASSESTS_PAGE_SIZE}
          navigation="social-media-assets"
        />
      </div>
    </div>
  );
};

export default AllSocialMediaAssets;
