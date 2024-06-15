"use client";

import useCheckPermission from "@/app/_hooks/usePermission";
import Stocks from "./Stocks";
import UploadModal from "./UploadModal";
import NoPermission from "@/app/components/ui/NoPermission";

const StocksPage = () => {
  const isUpdateStockPermission = useCheckPermission("upload_stock");
  const isDeleteStockPermission = useCheckPermission("delete_stock");
  const isStockPermission = useCheckPermission("stock");

  if (!isStockPermission) {
    return (
      <NoPermission message="You don't have permission to access this route" />
    );
  }
  return (
    <div className="p-3">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="heading-h1">Stock in Store</h1>
        <div className="flex items-center mb-8 mt-4 gap-3">
          {isUpdateStockPermission && <UploadModal />}
          {isDeleteStockPermission && (
            <button className="btn-primary">Edit Stoke</button>
          )}
        </div>
      </div>
      <Stocks />
    </div>
  );
};

export default StocksPage;
