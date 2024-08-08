import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { BASE_URL_IMAGE } from "@/app/lib/utils";
import Image from "next/image";

const ProductSpecifications = ({ specification }) => {
  console.log(specification);
  const allFeatures = specification.flatMap((feature) => feature.key_features);
  const uniqueFeatures = Array.from(new Set(allFeatures.map((f) => f.id))).map(
    (id) => allFeatures.find((f) => f.id === id)
  );

  return (
    <Table className="overflow-x-auto">
      <TableHeader>
        <TableRow className="bg-color-primary text-white hover:bg-color-primary">
          <TableHead></TableHead>
          {specification.map((product) => (
            <TableHead key={product.id}>{product.model_name}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {uniqueFeatures.map((feature, i) => {
          return (
            <TableRow key={i}>
              <TableCell className="font-serif font-semibold flex flex-col text-center gap-2 items-center">
                <Image
                  src={`${BASE_URL_IMAGE}${feature?.icon}`}
                  alt={feature}
                  width={30}
                  height={30}
                />

                <span className="ml-2 capitalize">{feature.key}</span>
              </TableCell>
              {specification.map((product) => {
                const productFeature =
                  product.key_features?.find(
                    (spec) => spec.id === feature?.id
                  ) || {};

                return (
                  <TableCell
                    key={product.id}
                    className="font-serif font-semibold"
                  >
                    <div className="flex items-center">
                      <span className="font-medium text-sm text-gray-700 ml-2 w-full text-center lg:text-start">
                        {productFeature?.pivot?.value || "N/A"}
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
