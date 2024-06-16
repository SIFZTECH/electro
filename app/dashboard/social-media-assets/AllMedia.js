import Search from "@/app/components/ui/Search";
import FolderFiles from "./FolderFiles";

const AllMedia = ({ metaData, page, data }) => {
  return (
    <div>
      {/* <Search /> */}
      {data.length === 0 ? (
        <h1 className="my-4">There is no Media Assets available</h1>
      ) : (
        <FolderFiles metaData={metaData} page={page} data={data} />
      )}
    </div>
  );
};

export default AllMedia;
