import { TbMotorbike } from "react-icons/tb";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const dummyData = [
  {
    id: 1,
    name: "NCM T3S - New",
    icon: ["/icons8-motor-64.png", "Motor"],
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 2,
    name: "NCM T3S",
    icon: ["/icons8-battery-90.png", "Battary"],
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 3,
    name: "NCM Milano +",
    icon: ["/icons8-performance-smartphone-50.png", "Display"],
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 4,
    icon: ["/icons8-charger-60.png", "Charger"],
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 5,
    icon: ["/icons8-charger-60.png", "Frome"],
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 6,
    icon: ["/icons8-charger-60.png", "Forks"],
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 7,
    icon: ["/icons8-charger-60.png", "Broking System"],
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 8,
    icon: ["/icons8-charger-60.png", "Gear Selector"],
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 9,
    icon: ["/icons8-derailleur-96.png", "Front Derailleur"],
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 10,
    icon: ["/icons8-bicycle-rear-derailleur-80.png", "Rear Derailleur"],
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 11,
    icon: ["/icons8-saddle-60.png", "Saddle"],
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 12,
    icon: ["/icons8-circle-80.png", "Shwalbe"],
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
];

const ProductSpecifications = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-primary">
          <TableHead></TableHead>
          <TableHead>NCM T3S - New</TableHead>
          <TableHead>NCM T3S</TableHead>
          <TableHead>NCM Milano +</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyData.map((data, i) => {
          return (
            <TableRow key={i + 1}>
              <TableCell
                data-label="NCM T3S - New"
                className="font-serif font-semibold flex justify-between items-center  xl:justify-center"
              >
                <span>&nbsp;</span>
                <div className="flex-1 flex flex-col items-end  lg:items-center">
                  <Image src={data.icon[0]} alt="name" width={30} height={30} />
                  <span className="font-medium text-sm text-gray-700 text-center">
                    {data.icon[1]}
                  </span>
                </div>
              </TableCell>
              <TableCell
                className="font-serif font-semibold"
                data-label="NCM T3S - New"
              >
                <span className="font-medium font-sans">
                  Das-kit X15 motor, 48V 250W, max speed 25 km/h
                </span>
              </TableCell>
              <TableCell
                className="font-serif font-semibold"
                data-label="NCM T3S"
              >
                <span className="font-medium font-sans">
                  Das-kit X15 motor, 48V 250W, max speed 25 km/h
                </span>
              </TableCell>
              <TableCell
                className="font-serif font-semibold"
                data-label="NCM T3S - Milano +"
              >
                <span className="font-medium font-sans">
                  Das-kit X15 motor, 48V 250W, max speed 25 km/h
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ProductSpecifications;
