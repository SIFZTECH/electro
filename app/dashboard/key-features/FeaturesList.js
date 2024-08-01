"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import EditFeature from "./EditFeature";
import DeleteFeature from "./DeleteFeature";
import Image from "next/image";
import { BASE_URL_IMAGE } from "@/app/lib/utils";

const FeaturesList = ({ index, feature }) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{feature.key}</TableCell>

      <TableCell>
        <Image
          src={`${BASE_URL_IMAGE}${feature.icon}`}
          // src="/motor-icon.png"
          height={40}
          width={40}
          alt=""
        />
      </TableCell>

      <TableCell data-label="Actions">
        <div className="flex gap-1 flex-wrap justify-end xl:justify-normal">
          <EditFeature feature={feature} />
          <DeleteFeature feature={feature} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default FeaturesList;
