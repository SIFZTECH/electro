"use client";

import { useOrder } from "@/app/_features/orders/useOrders";
import DownloadDocket from "./Download-Docket";
import OrderDetails from "./OrderDetails";
import ProductOrders from "./ProductOrders";
import Spinner from "@/app/components/ui/Spinner";
import NotFoundData from "@/app/components/ui/NotFoundData";

const OrderDetailsPage = ({ id }) => {
  const { data, isLoading, isError, error } = useOrder(id);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="heading-h1 mb-8 mt-4">Click and Collect</h1>
      {!isLoading && isError && error ? (
        <NotFoundData message="tHERE is no order with that id!" />
      ) : (
        <>
          <OrderDetails data={data?.data?.order} />
          <ProductOrders data={data?.data?.order} />
          <DownloadDocket id={id} status={data?.data?.order?.status} />
        </>
      )}
    </div>
  );
};

export default OrderDetailsPage;
