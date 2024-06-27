"use client";

import { useInvoice } from "@/app/_features/orders/useInvoice";
import Spinner from "@/app/components/ui/Spinner";

const OrderDetailsPage = ({ id }) => {
  const { data, isError, isLoading, error } = useInvoice(Number(id));

  console.log(error);

  if (isLoading) {
    return <Spinner />;
  }

  return <div dangerouslySetInnerHTML={{ __html: data }} />;
  //   console.log(typeof data);
  //   return (
  //     <div>
  //       <h1 className="heading-h1 mb-8 mt-4">Click and Collect</h1>
  //       <OrderDetails />
  //       <ProductOrders />
  //       <DownloadDocket />
  //     </div>
  //   );
};

export default OrderDetailsPage;
