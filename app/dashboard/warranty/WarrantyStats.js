import Stat from "./WarrantyStat";

const Stats = () => {
  return (
    <div className="flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-10">
      <Stat
        title="Month to Warranty Registration"
        value={465}
        percentage="0.07"
      />
      <Stat
        title="Month to Warranty Registration"
        value={758}
        percentage="0.27"
      />
      <Stat
        title="Last Year to Warranty Registration"
        value={758}
        percentage="0.27"
      />
    </div>
  );
};

export default Stats;
