"use client";
import useCheckPermission from "@/app/_hooks/usePermission";
import SettingsForm from "./SettingsForm";
import NotFoundData from "@/app/components/ui/NotFoundData";
import NoPermission from "@/app/components/ui/NoPermission";
import { useUser } from "@/app/_features/authentication/useUser";
import SettingsAdminForm from "./SettingsAdminForm";
import SettingsCustomerForm from "./SettingsCustomerForm";

const SettingsPage = () => {
  const isPermission = useCheckPermission("settings");
  const { user, isLoading, isError } = useUser();

  const user_role = !isLoading && user.roles[0].name;

  if (isPermission) {
    return user_role === "dealer" ? <SettingsForm /> : <SettingsAdminForm />;
  } else {
    return (
      <NoPermission message="You don't have permission to access that route!" />
    );
  }
};

export default SettingsPage;
