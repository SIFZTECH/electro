"use client";

import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import BlockUser from "./BlockUser";
import { useBlockedUsers } from "@/app/_features/users/useUsers";
import Spinner from "@/app/components/ui/Spinner";
import PaginationUI from "./Pagination";
import { useSearchParams } from "next/navigation";
import Search from "./SearchForBlockUsers";
import NotFoundData from "@/app/components/ui/NotFoundData";

const BlockedUsers = () => {
  const params = useSearchParams();
  const page = params.get("page") ? params.get("page") : 1;
  const { data, isLoading, isError, error } = useBlockedUsers();

  if (isLoading) {
    return <Spinner />;
  }

  console.log(data);

  return (
    <>
      <Search />
      {isError && error && error.message}
      {!isLoading && !isError && !error && data?.data?.length === 0 ? (
        <NotFoundData message="There is no blocked user with that name" />
      ) : (
        <Table className="!mt-4 *:table_modify">
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
            {data.data?.map((data, i) => {
              console.log(data);
              return (
                <TableRow key={i + 1} className="font-sans">
                  <TableCell data-label="User Name">{data.name}</TableCell>
                  <TableCell data-label="Email">{data.email}</TableCell>
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
