"use client";

import { useInvoice } from "@/app/_features/orders/useInvoice";
import Spinner from "@/app/components/ui/Spinner";

const OrderDetailsPage = ({ id }) => {
  const { data, isError, isLoading, error } = useInvoice(Number(id));

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div
      className="h-dvh w-full flex items-start justify-center"
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
};

export default OrderDetailsPage;
