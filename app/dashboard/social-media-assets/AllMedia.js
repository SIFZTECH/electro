import FolderFiles from "@/app/components/ui/FolderFiles";
import { Search } from "lucide-react";

const AllMedia = ({ data }) => {
  return (
    <div>
      <Search />
      {data.length === 0 ? (
        "There is no media available"
      ) : (
        <FolderFiles data={data} />
      )}
    </div>
  );
};

export default AllMedia;
