"use client";

import UsersTabs from "./UsersTabs";
import NewUserModal from "./NewUserModal";
import useCheckPermission from "@/app/_hooks/usePermission";
import NoPermission from "@/app/components/ui/NoPermission";

const UsersAndPermissionsPage = () => {
  const isManageUsersPermission = useCheckPermission("users_and_permissions");

  if (!isManageUsersPermission) {
    return (
      <NoPermission message="You don't have permission to access this route" />
    );
  }
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-y-3 sm:items-center my-3 mb-8">
        <h1 className="heading-h1">User and Permission</h1>
        <NewUserModal btn="New User" />
      </div>
      <UsersTabs />
    </div>
  );
};

export default UsersAndPermissionsPage;
