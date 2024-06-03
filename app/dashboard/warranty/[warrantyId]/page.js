"use client";
import { useWarranty } from "@/app/_features/warranties/useWarranty";

const WarrantyPageInfo = ({ params }) => {
  const { warrantyId } = params;
  // const { data, isLoading, error } = useWarranty(warrantyId);

  console.log(data, error);

  return <div></div>;
};

export default WarrantyPageInfo;
