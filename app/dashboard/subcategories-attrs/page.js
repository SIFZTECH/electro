"use client";

import AttributesTable from "./AttributesTable";
import Spinner from "@/app/components/ui/Spinner";
import CreateAttribute from "./CreateNewAttribute";
import { useAttributes } from "@/app/_features/attributes/useAttributes";

const Categories = () => {
  const { data, isLoading, isError, error } = useAttributes();

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="heading-h1 mb-5">All Attributes</h1>
        <CreateAttribute />
      </div>

      <AttributesTable data={data} />
    </div>
  );
};

export default Categories;
