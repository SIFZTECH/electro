import Stat from "./Stat";
import { MdOutlineShoppingCart } from "react-icons/md";

const Stats = () => {
  return (
    <div className="flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-10">
      <Stat
        title="Month of date E Bike Order"
        icon={<MdOutlineShoppingCart />}
        value={"64"}
        percentage="0.27"
      />
      <Stat
        title="Month of date E Bike Order"
        icon={<MdOutlineShoppingCart />}
        value={"64"}
        percentage="0.27"
      />
      <Stat
        title="Month of date E Bike Order"
        icon={<MdOutlineShoppingCart />}
        value={"64"}
        percentage="0.27"
      />
    </div>
  );
};

export default Stats;
