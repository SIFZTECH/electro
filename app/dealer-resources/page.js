import FilterBy from "./FilterBy";
import Main from "./Main";

const page = () => {
  return (
    <div className="dealer-resources">
      <h1 className="heading-h1 mb-10">Dealer Resources</h1>
      <div className="grid grid-cols-[.20fr_1fr] gap-6 w-[95%]">
        <FilterBy />
        <Main />
      </div>
    </div>
  );
};

export default page;
