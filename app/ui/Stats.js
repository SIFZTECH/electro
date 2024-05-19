import Stat from "./Stat";
import { MdOutlineShoppingCart } from "react-icons/md";

const Stats = () => {
  return (
    <div className="grid grid-cols-3 gap-10">
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
