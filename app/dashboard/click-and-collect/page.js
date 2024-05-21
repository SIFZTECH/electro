import Search from "@/app/ui/Search";
import Filter from "./Filter";
import RecentOrder from "./RecentOrder";

const page = () => {
  return (
    <div>
      <h1 className="heading-h1 mb-8 mt-4">Click and Collect</h1>
      <Search />
      <Filter />
      <RecentOrder />
    </div>
  );
};

export default page;
