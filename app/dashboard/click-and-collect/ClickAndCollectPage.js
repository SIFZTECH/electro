"use client";

import Search from "@/app/components/ui/Search";
import Orders from "./Orders";
import useCheckPermission from "@/app/_hooks/usePermission";
import NoPermission from "@/app/components/ui/NoPermission";

const ClickAndCollectPage = () => {
  const isClickAndCollectPermission = useCheckPermission("click_and_collect");

  if (!isClickAndCollectPermission) {
    return (
      <NoPermission message="You don't have permission to access this route" />
    );
  }
  return (
    <div>
      <h1 className="heading-h1 mb-8 mt-4">Click and Collect</h1>
      <Search navigateTo="click-and-collect" />
      <Orders />
    </div>
  );
};

export default ClickAndCollectPage;
