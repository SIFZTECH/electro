"use client";

import { useAttributes } from "@/app/_features/attributes/useAttributes";
import AttributeTable from "./AttributeTable";
import Spinner from "@/app/components/ui/Spinner";
import CreateNewAttribute from "./CreateNewAttribute";

const Categories = () => {
  const { data, isLoading, isError } = useAttributes();

  if (isLoading) return <Spinner />;

  const attributes = [{ ...data.attributes }];
  console.log(attributes);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="heading-h1 mb-5">All Attributes</h1>
        <CreateNewAttribute />
      </div>

      <AttributeTable attributes={data.attributes} />
    </div>
  );
};

export default Categories;
