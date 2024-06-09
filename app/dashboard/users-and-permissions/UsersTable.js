"use client";

import { Switch } from "@/app/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import EditUser from "./EditUser";
import BlockUser from "./BlockUser";
import AssignUserRole from "./AssignUserRole";
import { useUsers } from "@/app/_features/users/useUsers";
import Spinner from "@/app/components/ui/Spinner";
import PaginationUI from "./Pagination";
import { useSearchParams } from "next/navigation";
import Search from "./Search";
import NotFoundData from "@/app/components/ui/NotFoundData";

const UsersTable = () => {
  const params = useSearchParams();
  const page = params.get("page") ? +params.get("page") : 1;
  const { data, isLoading, isError, error } = useUsers(page);

  if (isLoading) {
    return <Spinner />;
  }

  console.log(data, error);

  return (
    <>
      <Search />
      {isError && error && error.message}
      {!isLoading && !isError && !error && data?.data?.length === 0 ? (
        <NotFoundData message="There is no user with that name" />
      ) : (
        <Table className="!mt-4 !mb-4 table_modify">
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
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data?.map((data, i) => {
              return (
                <TableRow key={i + 1} className="font-sans">
                  <TableCell data-label="User Name">
                    {data.firstname} {data.lastname}
                  </TableCell>
                  <TableCell data-label="Email">{data.email}</TableCell>
                  <TableCell data-label="Phone">{data.phone_number}</TableCell>
                  <TableCell data-label="Role">
                    {data?.roles[0]?.name}
                  </TableCell>
                  <TableCell data-label="Created At">
                    {new Date(data.created_at).toDateString()}
                  </TableCell>

                  <TableCell data-label="Actions">
                    <div className="flex gap-1 flex-wrap justify-end xl:justify-normal">
                      <AssignUserRole user={data} />
                      <EditUser user={data} />
                      <BlockUser user={data} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <PaginationUI data={data} page={+page} />
    </>
  );
};
export default UsersTable;
