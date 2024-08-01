import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import Image from "next/image";

import { BASE_URL_IMAGE } from "@/app/lib/utils";

const ProductSpecifications = ({ product }) => {
  const allFeatures = product?.key_features?.map((feature) => feature);
  // Extract all unique features across all products

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-primary hover:bg-color-primary text-white">
          <TableHead className=""></TableHead>
          <TableHead className="" key={product.id}>
            {product.model_name}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allFeatures.map((feature) => {
          const productFeature =
            product?.key_features?.find((spec) => spec.id === feature.id) || {};

          return (
            <TableRow key={feature}>
              <TableCell className="font-serif font-semibold flex flex-col text-center gap-2 items-center">
                {productFeature && (
                  <Image
                    src={`${BASE_URL_IMAGE}${productFeature.icon}`}
                    alt={feature}
                    width={30}
                    height={30}
                  />
                )}
                <span className="ml-2 capitalize">{feature.key}</span>
              </TableCell>

              <TableCell className="font-serif font-semibold w-[70%]">
                <div className="flex items-center">
                  <span className="font-medium text-sm text-gray-700 ml-2 w-full text-center">
                    {productFeature?.pivot?.value || "N/A"}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ProductSpecifications;
