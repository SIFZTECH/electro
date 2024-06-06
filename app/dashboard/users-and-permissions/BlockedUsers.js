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

const BlockedUsers = () => {
  const { data, isLoading, isError, error, total_num } = useBlockedUsers();

  if (isLoading) {
    return <Spinner />;
  }

  console.log(data);

  return (
    <>
      {isError && error && error.message}
      {!isLoading && !isError && data.data.data.length === 0 ? (
        "There is no blocked user"
      ) : (
        <Table className="mt-10 table_modify">
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

              <TableHead className="font-medium" scope="col">
                Status
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
                    {data.created_at}
                  </TableCell>

                  <TableCell data-label="Status">
                    {data?.is_blocked === 0 ? (
                      <span className="btn-primary bg-green-300">Active</span>
                    ) : (
                      <span className="btn-primary bg-yellow-300">
                        Inactive
                      </span>
                    )}
                  </TableCell>
                  <TableCell data-label="">
                    <div className="flex gap-1">
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
      )}
    </>
  );
};
export default BlockedUsers;
