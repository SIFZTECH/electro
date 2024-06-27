"use client";

import DownloadDocket from "./Download-Docket";
import OrderDetails from "./OrderDetails";
import ProductOrders from "./ProductOrders";
import Spinner from "@/app/components/ui/Spinner";

const OrderDetailsPage = ({ id }) => {
  return (
    <div>
      <h1 className="heading-h1 mb-8 mt-4">Click and Collect</h1>
      <OrderDetails />
      <ProductOrders />
      <DownloadDocket />
    </div>
  );
};

export default OrderDetailsPage;
