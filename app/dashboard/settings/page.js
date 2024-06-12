"use client";
import useCheckPermission from "@/app/_hooks/usePermission";
import SettingsForm from "./SettingsForm";
import NotFoundData from "@/app/components/ui/NotFoundData";

const Page = () => {
  const isPermission = useCheckPermission("settings");

  if (isPermission) {
    return <SettingsForm />;
  } else {
    return (
      <NotFoundData message="You don't have permission to access that route!" />
    );
  }
};

export default Page;
