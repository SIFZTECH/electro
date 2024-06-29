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

const ProductSpecifications = ({ specification }) => {
  console.log(specification);
  // Extract all unique features across all products
  const allFeatures = [
    ...new Set(
      specification.flatMap((product) =>
        product.specification.map((spec) => spec.key)
      )
    ),
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-primary hover:bg-color-primary">
          <TableHead></TableHead>
          {specification.map((product) => (
            <TableHead key={product.id}>{product.model_name}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {allFeatures.map((feature, i) => {
          const matchedFeature = featuresWithKeyAndIcon.find(
            (item) => item.key === feature
          );

          return (
            <TableRow key={i}>
              <TableCell className="font-serif font-semibold flex flex-col text-center gap-2 items-center">
                <Image
                  src={matchedFeature && `${matchedFeature?.icon}`}
                  alt={feature}
                  width={30}
                  height={30}
                />
                <span className="ml-2 capitalize">{feature}</span>
              </TableCell>
              {specification.map((product) => {
                const productFeature =
                  product.specification.find((spec) => spec.key === feature) ||
                  {};
                return (
                  <TableCell
                    key={product.id}
                    className="font-serif font-semibold"
                  >
                    <div className="flex items-center">
                      <span className="font-medium text-sm text-gray-700 ml-2 w-full text-center lg:text-start">
                        {productFeature.value || "N/A"}
                      </span>
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ProductSpecifications;
