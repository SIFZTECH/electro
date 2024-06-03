import { Switch } from "@/app/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import EditPermission from "./EditPermission";
import DeletePermission from "./DeletePermission";

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
          <TableHead scope="col" className="w-fit">
            SN
          </TableHead>
          <TableHead scope="col" className="w-fit">
            Role Name
          </TableHead>
          <TableHead scope="col" className="w-2/4">
            Perimission
          </TableHead>
          <TableHead scope="col" className="w-fit">
            Guard Name
          </TableHead>
          <TableHead scope="col" className="w-fit">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="font-sans">
        {dummyData.map((data, i) => {
          return (
            <TableRow key={i + 1}>
              <TableCell data-label="Id">{i + 1}</TableCell>
              <TableCell data-label="Click and Collect">Admin</TableCell>
              <TableCell data-label="Click and Collect">
                user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list,user-list
              </TableCell>
              <TableCell data-label="Click and Collect">web</TableCell>
              <TableCell data-label="Actions">
                <div className="flex gap-1">
                  <EditPermission />
                  <DeletePermission />
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
