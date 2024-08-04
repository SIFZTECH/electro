import { UserAdminOptions } from "./UserAdminOptions";

const SelectAdminUser = ({ user, setValue }) => {
  return (
    <div className="flex items-center gap-8">
      <div className="flex-1">
        <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
          Assign to Admin
        </label>
        <UserAdminOptions user={user} setValue={setValue} />
      </div>
    </div>
  );
};

export default SelectAdminUser;
