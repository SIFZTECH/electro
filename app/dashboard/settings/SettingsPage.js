"use client";
import useCheckPermission from "@/app/_hooks/usePermission";
import SettingsForm from "./SettingsForm";
import NotFoundData from "@/app/components/ui/NotFoundData";
import NoPermission from "@/app/components/ui/NoPermission";

const SettingsPage = () => {
  const isPermission = useCheckPermission("settings");

  if (isPermission) {
    return <SettingsForm />;
  } else {
    return (
      <NoPermission message="You don't have permission to access that route!" />
    );
  }
};

export default SettingsPage;
