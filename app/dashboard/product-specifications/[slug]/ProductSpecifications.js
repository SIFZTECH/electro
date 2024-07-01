import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import Image from "next/image";

import featuresWithKeyAndIcon from "@/app/lib/features.json";

const ProductSpecifications = ({ product }) => {
  const allFeatures = featuresWithKeyAndIcon.map((feature) => feature.key);
  // Extract all unique features across all products

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-primary hover:bg-color-primary">
          <TableHead className=""></TableHead>
          <TableHead className="" key={product.id}>
            {product.model_name}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allFeatures.map((feature) => {
          const matchedFeature = featuresWithKeyAndIcon.find(
            (item) => item.key === feature
          );

          const productFeature =
            product?.specification?.find((spec) => spec.key === feature) || {};

          return (
            <TableRow key={feature}>
              <TableCell className="font-serif font-semibold flex flex-col text-center gap-2 items-center">
                {matchedFeature && (
                  <Image
                    src={matchedFeature.icon}
                    alt={feature}
                    width={30}
                    height={30}
                  />
                )}
                <span className="ml-2 capitalize">{feature}</span>
              </TableCell>

              <TableCell className="font-serif font-semibold w-[70%]">
                <div className="flex items-center">
                  <span className="font-medium text-sm text-gray-700 ml-2 w-full text-center">
                    {productFeature.value || "N/A"}
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
