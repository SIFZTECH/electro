"use client";

import useCheckPermission from "@/app/_hooks/usePermission";
import Stocks from "./Stocks";
import UploadStock from "./UploadStock";
import NoPermission from "@/app/components/ui/NoPermission";
import Spinner from "@/app/components/ui/Spinner";
import NotFoundData from "@/app/components/ui/NotFoundData";
import { useProducts } from "@/app/_features/products/useProducts";
import PaginationUI from "@/app/components/ui/PaginationUI";
import { STOCKS_PAGE_SIZE } from "@/app/lib/utils";
import { useSearchParams } from "next/navigation";
import DownloadFile from "./DownloadFile";

const StocksPage = () => {
  const params = useSearchParams();

  const page = params.get("page") || 1;
  const categoryId = params.get("category");
  const brandId = params.get("brand");
  const query = params.get("query");
  const isUpdateStockPermission = useCheckPermission("upload_stock");
  const isDeleteStockPermission = useCheckPermission("delete_stock");
  const isStockPermission = useCheckPermission("stock");

  const { products, isLoading, isError, error } = useProducts(
    categoryId,
    brandId,
    page,
    query
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (!isStockPermission) {
    return (
      <NoPermission message="You don't have permission to access this route" />
    );
  }
  return (
    <>
      <div className="p-3">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h1 className="heading-h1">Stock in Store</h1>
          <div className="flex items-center mb-8 mt-4 gap-3">
            {isUpdateStockPermission && <UploadStock />}
            {isDeleteStockPermission && (
              <button className="btn-primary">Edit Stoke</button>
            )}
          </div>
        </div>
        {!isLoading && !isError && products?.data?.data?.length > 0 ? (
          <Stocks products={products} />
        ) : (
          <NotFoundData message="There is no stocks in store!" />
        )}
        {!isLoading && isError && error && (
          <h1>
            {error?.response?.data?.message
              ? error?.response?.data?.message
              : error.message}
          </h1>
        )}
        <PaginationUI
          data={products?.data}
          page={+page}
          page_size={STOCKS_PAGE_SIZE}
          navigation="stocks-in-store"
        />
        <DownloadFile />
      </div>
    </>
  );
};

export default StocksPage;
