import FilterBy from "../ui/FilterBy";
import Main from "../ui/Main";

const page = () => {
  return (
    <div className="dealer-resources">
      <h1 className="heading-h1 mb-10">Dealer Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] 2xl:grid-cols-[.20fr_1fr] gap-6 2xl:w-[95%]">
        <FilterBy />
        <Main />
      </div>
    </div>
  );
};

export default page;
