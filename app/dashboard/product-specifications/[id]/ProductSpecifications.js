import { TbMotorbike } from "react-icons/tb";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const dummyData = [
  {
    id: 1,
    name: "NCM T3S - New",
    icon: <TbMotorbike size={40} />,
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 2,
    name: "NCM T3S",
    icon: <TbMotorbike size={40} />,
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 3,
    name: "NCM Milano +",
    icon: <TbMotorbike size={40} />,
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 4,
    icon: <TbMotorbike size={40} />,
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 5,
    icon: <TbMotorbike size={40} />,
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 6,
    icon: <TbMotorbike size={40} />,
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 7,
    icon: <TbMotorbike size={40} />,
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 8,
    icon: <TbMotorbike size={40} />,
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 9,
    icon: <TbMotorbike size={40} />,
    features: [
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
      "Das-kit X15 motor, 48V 250W, max speed 25 km/h",
    ],
  },
  {
    id: 10,
    icon: <TbMotorbike size={40} />,
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
                {data.icon}
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
