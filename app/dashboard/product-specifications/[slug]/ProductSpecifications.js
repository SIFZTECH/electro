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
import { useFeaturesForSelect } from "@/app/_features/key_features/useFeatures";
import { BASE_URL_IMAGE } from "@/app/lib/utils";

const ProductSpecifications = ({ product }) => {
  const { data, isLoading, isError } = useFeaturesForSelect();

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
          const matchedFeature = data?.find((item) => item.id === feature.id);

          const productFeature =
            product?.key_features?.find((spec) => spec.id === feature.id) || {};

          console.log("p", productFeature);

          return (
            <TableRow key={feature}>
              <TableCell className="font-serif font-semibold flex flex-col text-center gap-2 items-center">
                {matchedFeature && (
                  <Image
                    src={`${BASE_URL_IMAGE}${matchedFeature.icon}`}
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
