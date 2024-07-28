import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import React from "react";
import { useResource } from "@/app/_features/dealer-resources/useResource";

const BreadcrumbN = ({ folderPath }) => {
  // Split the path and filter out empty strings
  const pathSegments = folderPath.split("/").filter((segment) => segment);

  const isNumeric = (segment) => {
    return !isNaN(segment);
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="text-slate-800 hover:text-color-primary font-medium"
            href="/dashboard/dealer-resources"
          >
            Dealer Resources
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          if (isNumeric(segment)) {
            return (
              <BreadcrumbSegment key={index} segment={segment} index={index} />
            );
          } else {
            return null; // Skip non-numeric segments
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );

  // Component to render each breadcrumb segment
  function BreadcrumbSegment({ segment, index }) {
    const isLast = index === pathSegments.length - 1;
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const { data, isLoading, error } = useResource(+segment);

    // if (isLoading) return <span>Loading...</span>;
    // if (error) return <span>Error: {error.message}</span>;

    return (
      <React.Fragment>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="text-slate-800 hover:text-color-primary font-medium"
            href={href}
          >
            {data?.data?.folder_name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  }
};

export default BreadcrumbN;
