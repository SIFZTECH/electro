const PermissionList = ({ title, permissions, register }) => {
  return (
    <div className="flex flex-wrap flex-col gap-2">
      <h1 className="mt-4 font-semibold font-serif">{title}</h1>
      <div className="mb-2 flex flex-wrap gap-y-3 gap-x-4 items-center">
        {permissions.map((permission) => (
          <div className="flex gap-2 items-center" key={permission.id}>
            <input
              type="checkbox"
              {...register(permission.name)}
              value={permission.name}
            />
            <label
              key="permission"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {permission.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionList;
