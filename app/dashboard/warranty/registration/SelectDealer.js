import { UserDealerOptions } from "../UserDealerOptions";

const SelectDealerUser = ({ setValue }) => {
  return (
    <div className="flex items-center gap-8">
      <div className="flex-1">
        <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
          Purchase from
        </label>
        <UserDealerOptions setValue={setValue} />
      </div>
    </div>
  );
};

export default SelectDealerUser;
