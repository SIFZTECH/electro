import NotFoundData from "@/app/components/ui/NotFoundData";
import Search from "@/app/components/ui/Search";
import FolderFiles from "./FolderFiles";

const AllResources = ({ data }) => {
  return (
    <div>
      <Search />
      {data.length === 0 ? (
        <NotFoundData message="There is no resources available" />
      ) : (
        <FolderFiles data={data} />
      )}
    </div>
  );
};

export default AllResources;
