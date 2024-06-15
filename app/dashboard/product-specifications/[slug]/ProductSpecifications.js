import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import Image from "next/image";

// Sample data to simulate fetched data structure
const specification = [
  {
    id: 1,
    model_name: "NCM T3S - New",
    specification: [
      {
        icon_path_value: "/icons8-motor-64.png",
        key: "Motor",
        value: "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      },
      // other features
    ],
  },
  {
    id: 2,
    model_name: "NCM T3S",
    specification: [
      {
        icon_path_value: "/icons8-battery-90.png",
        key: "Battery",
        value: "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      },
      // other features
    ],
  },
  {
    id: 3,
    model_name: "NCM Milano +",
    specification: [
      {
        icon_path_value: "/icons8-performance-smartphone-50.png",
        key: "Display",
        value: "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      },
      // other features
    ],
  },
  // other products
];

const ProductSpecifications = ({ specification }) => {
  // Extract all unique features across all products
  const allFeatures = [
    ...new Set(
      specification.flatMap((product) =>
        product.specification.map((spec) => spec.key)
      )
    ),
  ];

  // Map features to their icons
  const featureIcons = specification.reduce((acc, product) => {
    product.specification.forEach((spec) => {
      if (!acc[spec.key]) {
        acc[spec.key] = spec.icon_path_value;
      }
    });
    return acc;
  }, {});

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
        {allFeatures.map((feature, i) => (
          <TableRow key={i}>
            <TableCell className="font-serif font-semibold flex flex-col gap-2 items-center">
              <Image
                src={`https://electro-api.sifztech.com${featureIcons[feature]}`}
                alt={feature}
                width={30}
                height={30}
              />
              <span className="ml-2">{feature}</span>
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
                    <span className="font-medium text-sm text-gray-700 ml-2">
                      {productFeature.value || "N/A"}
                    </span>
                  </div>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductSpecifications;
