import FolderFiles from "@/app/components/ui/FolderFiles";
import NotFoundData from "@/app/components/ui/NotFoundData";
import Search from "@/app/components/ui/Search";

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
