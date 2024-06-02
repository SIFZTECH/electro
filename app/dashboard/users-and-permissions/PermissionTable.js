import { Switch } from "@/app/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

const dummyData = [
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 1",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 2",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 3",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 4",
  },
];

const PermissionTable = () => {
  return (
    <Table className="mt-10 recentOrders">
      <TableHeader>
        <TableRow className="text-center">
          <TableHead scope="col" className="2xl:w-[18rem]">
            Dealer Name
          </TableHead>
          <TableHead scope="col" className="text-center">
            Click and Collect
          </TableHead>
          <TableHead scope="col" className="text-center">
            Stock in Store
          </TableHead>
          <TableHead scope="col" className="text-center">
            Social Media Assets
          </TableHead>
          <TableHead scope="col" className="text-center">
            Dealer Resources
          </TableHead>
          <TableHead scope="col" className="text-center">
            Warranty
          </TableHead>
          <TableHead scope="col" className="text-center">
            Product Specifications
          </TableHead>
          <TableHead scope="col" className="text-center">
            Promotional Calendar
          </TableHead>
          <TableHead scope="col" className="text-center">
            Promotional Calendar
          </TableHead>
          <TableHead scope="col" className="text-center">
            Active
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="font-sans">
        {dummyData.map((data, i) => {
          return (
            <TableRow key={i + 1}>
              <TableCell data-label="Dealer Name">{data.dealerName}</TableCell>
              <TableCell data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </TableCell>
              <TableCell data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </TableCell>
              <TableCell data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </TableCell>
              <TableCell data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </TableCell>
              <TableCell data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </TableCell>
              <TableCell data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </TableCell>
              <TableCell data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </TableCell>
              <TableCell data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </TableCell>
              <TableCell data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <Switch />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default PermissionTable;
