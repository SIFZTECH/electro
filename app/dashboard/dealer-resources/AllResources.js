import NotFoundData from "@/app/components/ui/NotFoundData";
import Search from "@/app/components/ui/Search";
import FolderFiles from "./FolderFiles";
import PaginationUI from "@/app/components/ui/PaginationUI";
import { RESOURCE_PAGE_SIZE } from "@/app/lib/utils";

const AllResources = ({ data, metaData, page }) => {
  return (
    <div>
      <Search />
      {data.length === 0 ? (
        <NotFoundData message="There is no resources available" />
      ) : (
        <FolderFiles data={data} />
      )}
      <div className="mt-6">
        <PaginationUI
          data={metaData}
          page={page}
          page_size={RESOURCE_PAGE_SIZE}
          navigation="dealer-resources"
        />
      </div>
    </div>
  );
};

export default AllResources;
