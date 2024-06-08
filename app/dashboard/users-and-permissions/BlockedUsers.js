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
import { useBlockedUsers } from "@/app/_features/users/useUsers";
import Spinner from "@/app/components/ui/Spinner";
import PaginationUI from "./Pagination";
import { useSearchParams } from "next/navigation";

const BlockedUsers = () => {
  const params = useSearchParams();
  const page = params.get("page") ? params.get("page") : 1;
  const { data, isLoading, isError, error } = useBlockedUsers();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isError && error && error.message}
      {!isLoading && !isError && !error && data.data.data.length === 0 ? (
        "There is no blocked user"
      ) : (
        <Table className=" !mb-4 *:table_modify">
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium" scope="col">
                User Name
              </TableHead>
              <TableHead className="font-medium" scope="col">
                Email
              </TableHead>
              <TableHead className="font-medium" scope="col">
                Phone Number
              </TableHead>
              <TableHead className="font-medium" scope="col">
                Role
              </TableHead>
              <TableHead className="font-medium" scope="col">
                Date
              </TableHead>

              <TableHead className="font-medium w-1/6" scope="col">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {data.data.data?.map((data, i) => {
              return (
                <TableRow key={i + 1} className="font-sans">
                  <TableCell data-label="User Name">{data.name}</TableCell>
                  <TableCell className="w-fit" data-label="Email">
                    {data.email}
                  </TableCell>
                  <TableCell data-label="Phone">{data.phone_number}</TableCell>
                  <TableCell data-label="Role">{data.roles[0]?.name}</TableCell>
                  <TableCell data-label="Created At">
                    {new Date(data.created_at).toDateString()}
                  </TableCell>

                  <TableCell data-label="">
                    <div className="flex gap-1">
                      <BlockUser user={data} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      )}

      <PaginationUI data={data?.data} page={+page} />
    </>
  );
};
export default BlockedUsers;
