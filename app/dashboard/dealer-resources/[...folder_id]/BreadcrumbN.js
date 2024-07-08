import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import React from "react";

const BreadcrumbN = ({ folderPath }) => {
  // Split the path and filter out empty strings
  const pathSegments = folderPath.split("/").filter((segment) => segment);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = "/" + pathSegments.slice(0, index + 1).join("/");

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-slate-800 hover:text-color-primary"
                  href={href}
                >
                  {segment}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbN;
