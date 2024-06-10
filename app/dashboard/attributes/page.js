"use client";

import { useAttributes } from "@/app/_features/attributes/useAttributes";
import AttributeTable from "./AttributeTable";
import Spinner from "@/app/components/ui/Spinner";
import CreateNewAttribute from "./CreateNewAttribute";
import Link from "next/link";

const Categories = () => {
  const { data, isLoading, isError } = useAttributes();

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="heading-h1 mb-5">All Attributes</h1>
        <div className="flex gap-3">
          <CreateNewAttribute />
          <Link
            href="/dashboard/attributes/create-attribute-value"
            className="btn-primary"
          >
            Add New Attribute Value
          </Link>
        </div>
      </div>

      <AttributeTable attributes={data.attributes} />
    </div>
  );
};

export default Categories;