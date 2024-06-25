import { useUser } from "../_features/authentication/useUser";

const useCheckPermission = (name) => {
  const { permissions } = useUser();

  const isPermission = permissions.some((per) => per.name === name);

  return isPermission;
};

export default useCheckPermission;
