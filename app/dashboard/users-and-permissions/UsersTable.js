import { Switch } from "@/app/components/ui/switch";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import AssignUserRole from "./AssignUserRole";

const dummyData = [
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 1",
    dealerEmail: "example@email.com",
    phoneNum: "01822933944",
    userRole: "dealer",
    date: "20-01-2023",
    membership: "Regular",
    status: "active",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 2",

    dealerEmail: "example@email.com",
    phoneNum: "01822933944",
    userRole: "dealer",
    date: "20-01-2023",
    membership: "Regular",
    status: "active",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 3",
    dealerEmail: "example@email.com",
    phoneNum: "01822933944",
    userRole: "dealer",
    date: "20-01-2023",
    membership: "Regular",
    status: "active",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 4",
    dealerEmail: "example@email.com",
    phoneNum: "01822933944",
    userRole: "dealer",
    date: "20-01-2023",
    membership: "Regular",
    status: "active",
  },
];

const UsersTable = () => {
  return (
    <Table className="mt-10 recentOrders">
      <TableHeader className="font-semibold">
        <TableRow>
          <TableHead scope="col">First Name</TableHead>
          <TableHead scope="col">Last Email</TableHead>
          <TableHead scope="col">Phone Number</TableHead>
          <TableHead scope="col">Role</TableHead>
          <TableHead scope="col">Date</TableHead>

          <TableHead scope="col">Status</TableHead>
          <TableHead scope="col">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <tbody>
        {dummyData.map((data, i) => {
          return (
            <TableRow key={i + 1} className="font-sans">
              <TableCell data-label="Dealer Name">{data.dealerName}</TableCell>
              <TableCell data-label="Click and Collect">
                {data.dealerEmail}
              </TableCell>
              <TableCell data-label="Click and Collect">
                {data.phoneNum}
              </TableCell>
              <TableCell data-label="Click and Collect">
                {data.userRole}
              </TableCell>
              <TableCell data-label="Click and Collect">{data.date}</TableCell>

              <TableCell
                data-label="Click and Collect"
                className="text-green-600"
              >
                {data.status}
              </TableCell>
              <TableCell data-label="Click and Collect" className="w-fit">
                <div className="flex gap-1">
                  <EditUser />
                  <DeleteUser />
                  <AssignUserRole />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </tbody>
    </Table>
  );
};
export default UsersTable;
