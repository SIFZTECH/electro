"use client";

import { Switch } from "@/app/components/ui/switch";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import EditUser from "./EditUser";
import BlockUser from "./BlockUser";
import AssignUserRole from "./AssignUserRole";
import { useCustomerUsers } from "@/app/_features/users/useUsers";
import Spinner from "@/app/components/ui/Spinner";
import { useSearchParams } from "next/navigation";
import PaginationUI from "@/app/components/ui/PaginationUI";
import { PAGE_SIZE } from "@/app/lib/utils";

const CustomersTable = () => {
  const params = useSearchParams();
  const page = params.get("page") ? +params.get("page") : 1;
  const { data, isLoading, isError, error } = useCustomerUsers(page);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Table className="mt-10 ">
        <TableHeader className="font-semibold">
          <TableRow>
            <TableHead scope="col">User Name</TableHead>
            <TableHead scope="col">Email</TableHead>
            <TableHead scope="col">Phone Number</TableHead>
            <TableHead scope="col">Role</TableHead>
            <TableHead scope="col">Date</TableHead>

            <TableHead scope="col" className="w-1/6">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {!isError &&
            !error &&
            data.data.data?.map((data, i) => {
              return (
                <TableRow key={i + 1} className="font-sans">
                  <TableCell data-label="User Name">
                    {data.firstname} {data.lastname}
                  </TableCell>
                  <TableCell data-label="Email">{data.email}</TableCell>
                  <TableCell data-label="Phone">{data.phone}</TableCell>
                  <TableCell data-label="Role">{data.roles[0]?.name}</TableCell>
                  <TableCell data-label="Created At">
                    {data.created_at}
                  </TableCell>

                  <TableCell data-label="Actions">
                    <div className="flex gap-2 flex-wrap justify-end xl:justify-normal">
                      <EditUser user={data} />
                      <BlockUser user={data} />
                      <AssignUserRole user={data} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </tbody>
      </Table>
      <PaginationUI
        data={data?.data}
        page={page}
        page_size={PAGE_SIZE}
        navigation="users-and-permissions"
      />
    </>
  );
};
export default CustomersTable;
