import { UserAdminOptionsForNew } from "./UserAdminOptionsForNew";

const SelectAdminUserForNew = ({ setValue }) => {
  return (
    <div className="flex items-center gap-8">
      <div className="flex-1">
        <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
          Account Manager
        </label>
        <UserAdminOptionsForNew setValue={setValue} />
      </div>
    </div>
  );
};

export default SelectAdminUserForNew;
